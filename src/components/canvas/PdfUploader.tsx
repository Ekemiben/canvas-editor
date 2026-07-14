import React from 'react';
import { DropZone } from '@/components/ui/DropZone';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  progress: number;
  error?: Error | null;
}

export function PdfUploader({
  onFileSelect,
  isLoading,
  progress,
  error,
}: PdfUploaderProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">
            Canvas Editor
          </h1>
          <p className="text-sm text-zinc-400">
            Upload a PDF document to start editing, pinning, and cropping.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/50 p-4 text-sm text-red-200 border border-red-800">
            {error.message || 'An error occurred while loading the PDF.'}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Processing PDF...
            </h3>
            <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${Math.max(5, progress * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              {Math.round(progress * 100)}% Complete
            </p>
          </div>
        ) : (
          <DropZone onFileAccepted={onFileSelect} accept="application/pdf" />
        )}
      </div>
    </div>
  );
}
