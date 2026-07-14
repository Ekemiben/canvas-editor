import React, { useCallback, useState } from 'react';

interface DropZoneProps {
  onFileAccepted: (file: File) => void;
  accept?: string;
  label?: string;
  subLabel?: string;
}

export function DropZone({
  onFileAccepted,
  accept = 'application/pdf',
  label = 'Drag and drop a PDF file here',
  subLabel = 'or click to browse files',
}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file && (accept === '*' || file.type.match(accept.replace('/*', '.*')))) {
        onFileAccepted(file);
      }
    },
    [onFileAccepted, accept]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileAccepted(file);
      }
    },
    [onFileAccepted]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
        isDragOver
          ? 'border-blue-500 bg-blue-500/10'
          : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-500 hover:bg-zinc-800/50'
      }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label={label}
      />
      <div className="pointer-events-none flex flex-col items-center gap-2">
        <svg
          className="h-10 w-10 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <h3 className="text-lg font-semibold text-zinc-200">{label}</h3>
        <p className="text-sm text-zinc-400">{subLabel}</p>
      </div>
    </div>
  );
}
