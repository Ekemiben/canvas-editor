# Tradeoffs

This implementation makes several deliberate tradeoffs to deliver a working, maintainable experience quickly.

- Rasterized PDF pages instead of vector embedding:
  - Pros: fast integration, stable rendering, compatibility with `tldraw` image assets.
  - Cons: limited zoom fidelity, larger memory footprint, not true PDF vector content.

- Browser-only rendering with `pdfjs-dist`:
  - Pros: no backend required, immediate user feedback, portable.
  - Cons: larger bundle size, client memory usage for long PDFs.

- Locked PDF shapes:
  - Pros: protects the underlying document from accidental movement.
  - Cons: prevents direct PDF page repositioning or editing inside the editor.

- Custom pin binding instead of grouping:
  - Pros: flexible attachment of overlapping shapes without forcing a group structure.
  - Cons: bindings are less discoverable than explicit group interactions.

- Simple export workflow:
  - Pros: easy to use and fast to implement.
  - Cons: only PNG export, no export settings panel, and no support for non-rectangular cropping.

- Minimal UI scaffolding:
  - Pros: keeps the app focused and reduces complexity.
  - Cons: less feature discoverability and fewer user controls compared to a mature product.
