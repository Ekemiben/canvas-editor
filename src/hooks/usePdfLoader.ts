import { useState, useCallback, useEffect } from 'react';
import type { PdfPageData } from '@/types';
import { renderPdfToImages } from '@/features/pdf/pdf-renderer';

export function usePdfLoader() {
  const [pages, setPages] = useState<PdfPageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  // No cleanup needed for Data URLs

  const loadPdf = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setPages([]);

    try {
      const renderedPages = await renderPdfToImages(file, (p) => {
        setProgress(p);
      });
      setPages(renderedPages);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading PDF'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    pages,
    isLoading,
    error,
    progress,
    loadPdf,
  };
}
