# Future Improvements

The current implementation provides the baseline experience described in the exercise. Some directions for improvement:

- Add a file management and reload flow:
  - Support replacing or clearing the current PDF without refreshing the page.
  - Add page navigation controls for long documents.

- Improve PDF rendering quality and performance:
  - Render pages lazily or on-demand for large PDFs instead of all pages up front.
  - Cache rendered images in IndexedDB or session storage.

- Strengthen pin interactions:
  - Add visual feedback when shapes become attached by a pin.
  - Support unbinding or explicit grouping/un-grouping of pinned shapes.

- Enhance camera exports:
  - Add a preview mode before export.
  - Support exporting to PDF or SVG in addition to PNG.
  - Preserve transparency and background settings more explicitly.

- Expand editor tools:
  - Add annotation tools, text labels, or freehand drawing on top of PDF pages.
  - Add snapping, rulers, or layout aids to support document annotation workflows.

- Accessibility and keyboard navigation:
  - Make the capture button and tool selection more accessible to keyboard and screen reader users.
  - Add visible keyboard shortcut hints and focus states.

- Persist user state:
  - Save the current document, pins, and camera regions across refreshes using local storage.
