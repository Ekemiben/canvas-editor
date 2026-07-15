# Known Limitations

The existing implementation is functional but intentionally minimal.

- PDF rendering is rasterized:
  - Pages are converted to PNG image assets, so zooming beyond native render resolution may cause visible pixelation.
  - This is a tradeoff for stability and compatibility with `tldraw`.

- Single-session PDF load:
  - There is no in-app document reset button; reloading the page is required to load a different file.

- Pin binding behavior is implicit:
  - The pin tool only attaches shapes when two or more eligible overlapping shapes exist at the click point.
  - There is no explicit visual indicator that attachments were created.

- Export is limited to PNG:
  - The camera tool exports the selected region as a PNG blob only.
  - There is no in-app support for other image formats or PDF export.

- No advanced page management:
  - Pages are stacked vertically in the editor and not grouped into a paginated view.
  - Very long documents may require more manual navigation.

- Camera region is outline-based:
  - The crop region is a resizable box with a button overlay.
  - The capture control is rendered as an HTML button inside the shape rather than a fully native canvas control.

- Large PDFs can be memory-intensive:
  - Each page is encoded as a base64 data URL and kept in memory while the editor is active.
