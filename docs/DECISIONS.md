# Decisions

This implementation reflects a preference for building on proven libraries while keeping the custom layer small and focused.

- Next.js App Router with client-only `tldraw` import:
  - `tldraw` depends on browser APIs, so `MainView` is dynamically imported with `ssr: false`.
  - This keeps the app compatible with Next.js 16 while avoiding hydration issues.

- `pdfjs-dist` for PDF rendering:
  - Using the official PDF.js distribution allows render PDFs reliably in the browser.
  - A worker bundle is loaded from `public/pdf.worker.min.mjs` to keep rendering off the main thread.

- Rendering PDF pages to raster image assets:
  - This allows seamless integration with `tldraw`’s image shape primitive.
  - It sidesteps the complexity of embedding PDF vectors directly into the editor.

- Locked PDF shapes:
  - PDF pages are created as locked image shapes to prevent accidental repositioning while users interact with overlays and tools.

- Custom tools over custom canvas drawing:
  - The pin and camera tools are implemented as `tldraw` extensions, using `StateNode` and `BaseBoxShapeTool`.
  - This leverages the editor’s event handling, selection state, and export APIs.

- Minimal custom toolbar injection:
  - The custom tools are added to the `tldraw` toolbar via `UI_OVERRIDES` and a custom `Toolbar` component.
  - This preserves the familiar editor chrome while making the new tools accessible.

- Memory vs. convenience:
  - PDF pages are stored as data URLs so assets are instantly available in the editor.
  - It trades memory usage for simplicity and avoids additional server or blob URL lifecycle management.
