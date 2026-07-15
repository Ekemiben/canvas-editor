# PDF Canvas Editor

A lightweight frontend canvas editor built with Next.js, React, TypeScript, Tailwind CSS, and `tldraw`.

The app lets users upload a PDF, renders each page as a locked canvas image, and adds two custom tools:

- Pin Tool: drop a pin on the canvas and attach overlapping shapes together.
- Camera Tool: draw a crop region and export the selected area as a PNG.

## Features

- Upload and render multi-page PDF files in the browser
- Convert PDF pages to image assets for `tldraw`
- Lock PDF page shapes to prevent accidental movement
- Custom pin tool for attaching overlapping canvas objects
- Custom camera tool for cropping and exporting content
- Export captured canvas area as a PNG download

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- `tldraw` editor framework
- `pdfjs-dist` for PDF rendering

## Getting Started

1. Install dependencies:

    bash
npm install


2. Start the development server:

    bash
npm run dev


3. Open the app in your browser:

    text
http://localhost:3000


## Project Structure

- `src/app/page.tsx`: entry point that renders the editor shell
- `src/components/canvas/MainView.tsx`: handles PDF upload state and switches between upload and editor views
- `src/hooks/usePdfLoader.ts`: loads the PDF and tracks progress
- `src/features/pdf`: builds PDF image assets and page shapes
- `src/features/pin`: implements the custom pin tool and attachment binding behavior
- `src/features/camera`: implements the camera crop tool and export interaction
- `src/components/ui/DropZone.tsx`: drag-and-drop PDF upload UI

## Notes

- PDF pages are rasterized as PNG assets for compatibility with `tldraw`
- The current experience is optimized for a single PDF session per page load
- Export currently supports PNG only

## Documentation

- `docs/ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/TRADEOFFS.md`
- `docs/FUTURE_IMPROVEMENTS.md`
- `docs/KNOWN_LIMITATIONS.md`
- `docs/WALKTHROUGH.md`