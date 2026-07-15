# Walkthrough

The app launches to a PDF upload screen.

1. Upload a PDF
   - Drag a PDF file onto the upload panel or click the panel to browse.
   - A progress bar appears while the PDF is rendered into image assets.
   - Errors are shown in a simple message panel if the upload fails.

2. Review the canvas
   - After upload, the app renders each page as a locked image shape in `tldraw`.
   - Pages are stacked vertically with a small gap between them.
   - The canvas editor opens with the default tldraw toolbar plus custom `Pin` and `Camera` tools.

3. Place a pin
   - Select the Pin tool from the toolbar or press `P`.
   - Click anywhere on the canvas to drop a pin.
   - If the click lands on two or more overlapping shapes, the tool attaches those shapes together using pin bindings.
   - The pin itself is also bound to the selected anchor shape so it moves with the group.

4. Capture with the camera tool
   - Select the Camera tool from the toolbar or press `C`.
   - Drag to create a resizable camera region over the area you want to export.
   - Resize the blue dashed box as needed.
   - Click the `Capture` button inside the camera region to export the selected content as a PNG download.

5. Interaction notes
   - PDF page content is intentionally locked, so only overlays and tools are editable.
   - The editor retains full `tldraw` behavior for selection and tool switching.
   - The exported PNG is generated from the selected shapes and the camera region bounds.

The app surface is intentionally simple and focuses on the core exercise: PDF rendering, pin attachments, and camera crop/export in a `tldraw` canvas.
