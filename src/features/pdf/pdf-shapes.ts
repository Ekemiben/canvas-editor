import { AssetRecordType, createShapeId, Editor, TLAsset } from 'tldraw';
import type { PdfPageData } from '@/types';

export function createPdfShapes(editor: Editor, pages: PdfPageData[]) {
  const gap = 20; // gap between pages
  let currentY = 0;
  
  const assetsToCreate: TLAsset[] = [];
  const shapesToCreate: any[] = []; // Using any to bypass strict TLShape typing here, tldraw handles it internally

  pages.forEach((page) => {
    if (!page.dataUrl) return;

    const assetId = AssetRecordType.createId();
    const shapeId = createShapeId(`pdf-page-${page.pageNumber}`);

    // Register the data url as an image asset
    assetsToCreate.push({
      id: assetId,
      type: 'image',
      typeName: 'asset',
      props: {
        name: `page-${page.pageNumber}.png`,
        src: page.dataUrl,
        w: page.width,
        h: page.height,
        mimeType: 'image/png',
        isAnimated: false,
      },
      meta: {},
    });

    // Create the shape that uses the asset
    shapesToCreate.push({
      id: shapeId,
      type: 'image',
      x: 0,
      y: currentY,
      isLocked: true, // Lock PDF pages so they don't get accidentally moved
      props: {
        assetId,
        w: page.width,
        h: page.height,
      },
    });

    currentY += page.height + gap;
  });

  // Batch the creation for better performance
  editor.run(() => {
    editor.createAssets(assetsToCreate);
    editor.createShapes(shapesToCreate);
    
    // Select all pages to compute the bounds, then zoom to fit them
    editor.selectAll();
    editor.zoomToSelection({ animation: { duration: 0 } });
    editor.selectNone();
  });
}
