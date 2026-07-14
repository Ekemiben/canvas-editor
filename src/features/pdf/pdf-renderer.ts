import * as pdfjsLib from 'pdfjs-dist';
import type { PdfPageData } from '@/types';
import { UI_CONSTANTS } from '@/constants';

// Configure the worker to use the file we copied to the public folder
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

export async function renderPdfToImages(
  file: File,
  onProgress: (progress: number) => void
): Promise<PdfPageData[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    const numPages = Math.min(pdf.numPages, UI_CONSTANTS.PDF_UPLOAD_MAX_PAGES);
    const pages: PdfPageData[] = [];

    // Render each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      
      // Use a scale of 1.5 to 2 for good visual quality without excessive memory usage
      // We'll scale it down in CSS/tldraw if needed
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Could not create canvas context');
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the PDF page to the canvas
      await page.render({
        canvasContext: context,
        viewport,
        canvas: canvas as any, // TypeScript workaround for RenderParameters
      }).promise;

      // Convert the canvas to a Data URL since tldraw requires valid protocols (data: or http:)
      const dataUrl = canvas.toDataURL('image/png');

      pages.push({
        pageNumber: i,
        // Store logical dimensions (unscaled) for accurate sizing in tldraw
        width: viewport.width / scale,
        height: viewport.height / scale,
        dataUrl,
      });

      // Report progress
      onProgress(i / numPages);
    }

    // Cleanup resources
    loadingTask.destroy();
    
    return pages;
  } catch (error) {
    console.error('Error rendering PDF:', error);
    throw error;
  }
}
