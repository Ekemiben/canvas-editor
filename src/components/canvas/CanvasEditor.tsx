'use client';

import React, { useMemo } from 'react';
import {
  Tldraw,
  Editor,
  TLUiOverrides,
  TLUiComponents,
  DefaultToolbar,
  DefaultToolbarContent,
  ToolbarItem,
} from 'tldraw';
import 'tldraw/tldraw.css';
import type { PdfPageData } from '@/types';
import { createPdfShapes } from '@/features/pdf/pdf-shapes';
import { TOOL_IDS } from '@/constants';
import { PinShapeUtil } from '@/features/pin/PinShapeUtil';
import { PinTool } from '@/features/pin/PinTool';
import { PinBindingUtil } from '@/features/pin/PinBindingUtil';
import { CameraShapeUtil } from '@/features/camera/CameraShapeUtil';
import { CameraTool } from '@/features/camera/CameraTool';

interface CanvasEditorProps {
  pages: PdfPageData[];
}

// These are stable references — defined at module level so React doesn't
// re-create them each render, which would cause tldraw to remount.
const SHAPE_UTILS = [PinShapeUtil, CameraShapeUtil];
const TOOLS = [PinTool, CameraTool];
const BINDING_UTILS = [PinBindingUtil];

const UI_OVERRIDES: TLUiOverrides = {
  tools(editor, tools) {
    return {
      ...tools,
      [TOOL_IDS.PIN]: {
        id: TOOL_IDS.PIN,
        icon: 'dot' as const,
        label: 'Pin' as any,
        kbd: 'p',
        onSelect() {
          editor.setCurrentTool(TOOL_IDS.PIN);
        },
      },
      [TOOL_IDS.CAMERA]: {
        id: TOOL_IDS.CAMERA,
        icon: 'tool-screenshot' as const, // camera/screenshot icon
        label: 'Camera' as any,
        kbd: 'c',
        onSelect() {
          editor.setCurrentTool(TOOL_IDS.CAMERA);
        },
      },
    };
  },
};

// Custom toolbar that appends Pin and Camera after the default tools
const COMPONENTS: TLUiComponents = {
  Toolbar: (props) => (
    <DefaultToolbar {...props}>
      <DefaultToolbarContent />
      <ToolbarItem tool={TOOL_IDS.PIN} />
      <ToolbarItem tool={TOOL_IDS.CAMERA} />
    </DefaultToolbar>
  ),
};

export function CanvasEditor({ pages }: CanvasEditorProps) {
  const handleMount = (editor: Editor) => {
    if (pages && pages.length > 0) {
      // Clear any pre-existing shapes first
      editor.selectAll();
      editor.deleteShapes(editor.getSelectedShapeIds());

      createPdfShapes(editor, pages);
    }
  };

  return (
    <div className="h-full w-full">
      <Tldraw
        onMount={handleMount}
        shapeUtils={SHAPE_UTILS}
        tools={TOOLS}
        bindingUtils={BINDING_UTILS}
        overrides={UI_OVERRIDES}
        components={COMPONENTS}
        autoFocus
      />
    </div>
  );
}
