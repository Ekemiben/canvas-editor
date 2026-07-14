// Global application types
export interface PdfPageData {
  pageNumber: number;
  width: number;
  height: number;
  dataUrl?: string;
  blobUrl?: string;
}

export interface PdfDocumentInfo {
  numPages: number;
  fileName: string;
}
