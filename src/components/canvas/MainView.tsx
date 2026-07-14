'use client';

import { usePdfLoader } from '@/hooks/usePdfLoader';
import { PdfUploader } from '@/components/canvas/PdfUploader';
import { CanvasEditor } from '@/components/canvas/CanvasEditor';

export default function MainView() {
  const { pages, isLoading, error, progress, loadPdf } = usePdfLoader();

  return (
    <div className="flex h-full w-full flex-col">
      {pages.length === 0 ? (
        <PdfUploader
          onFileSelect={loadPdf}
          isLoading={isLoading}
          error={error}
          progress={progress}
        />
      ) : (
        <CanvasEditor pages={pages} />
      )}
    </div>
  );
}
