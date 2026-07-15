# Architecture

The Canvas Editor is a client-side Next.js application built around `tldraw` and `pdfjs-dist`.

Key architecture components:
- `src/app/page.tsx`: renders the top-level `AppShell` inside the Next.js app router.
- `src/components/canvas/AppShell.tsx`: dynamically imports `MainView` with `ssr: false` to avoid server-side rendering issues for `tldraw`.
- `src/components/canvas/MainView.tsx`: orchestrates the PDF loading lifecycle and switches between the upload UI and the editor view.
- `src/hooks/usePdfLoader.ts`: manages file loading state, progress, and error handling, and delegates PDF rendering to `renderPdfToImages`.
- `src/features/pdf/pdf-renderer.ts`: converts uploaded PDF pages to image assets using `pdfjs-dist` and the public worker bundle.
- `src/features/pdf/pdf-shapes.ts`: translates rendered PDF pages into `tldraw` image assets and locked image shapes stacked vertically.
- `src/components/canvas/CanvasEditor.tsx`: configures the `tldraw` editor with custom tools, shape utils, binding utils, and the toolbar.
- `src/features/pin/*`: defines the custom pin tool, pin shape, and pin binding logic used to attach overlapping shapes.
- `src/features/camera/*`: defines the camera tool and camera region shape used to crop and export a canvas region.

Design principles:
- Browser-first rendering: all PDF processing happens in the browser, with a dedicated `pdfjs-dist` worker loaded from `public/pdf.worker.min.mjs`.
- Progressive loading: `renderPdfToImages` renders each page sequentially and reports progress so the user sees upload feedback.
- Reuse `tldraw` extensibility: custom tools and shape utils are implemented on top of `tldraw` rather than building a bespoke canvas engine.
- Immutable PDF source imagery: PDF pages are created as locked image shapes to preserve the rendered document while allowing overlays and annotations.

Data flow:
1. User selects or drops a PDF file in `PdfUploader`.
2. `usePdfLoader` reads the file, passes it to `renderPdfToImages`, and tracks progress.
3. Each PDF page becomes a data URL image asset and a locked image shape in `tldraw`.
4. The editor loads custom tools, and the user can place pins or create camera regions on top of the rendered PDF canvas.

UI architecture:
- `DropZone` provides the upload surface with drag-and-drop and file input handling.
- `CanvasEditor` wraps `Tldraw` and extends its toolbar with the custom `Pin` and `Camera` tools.
- Custom shape components render HTML-based visuals for pins and camera regions.
