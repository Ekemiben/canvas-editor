import React from 'react';
import { Tldraw, Editor, TLUiOverrides, TLUiComponents, DefaultToolbar, DefaultToolbarContent, ToolbarItem } from 'tldraw';
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

const customShapeUtils = [PinShapeUtil, CameraShapeUtil];
const customTools = [PinTool, CameraTool];
const customBindingUtils = [PinBindingUtil];

const uiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    return {
      ...tools,
      [TOOL_IDS.PIN]: {
        id: TOOL_IDS.PIN,
        icon: 'dot',
        label: 'Pin' as any,
        kbd: 'p',
        onSelect: () => editor.setCurrentTool(TOOL_IDS.PIN),
      },
      [TOOL_IDS.CAMERA]: {
        id: TOOL_IDS.CAMERA,
        icon: 'tool-frame', // Built-in frame icon representing a camera crop box
        label: 'Camera' as any,
        kbd: 'c',
        onSelect: () => editor.setCurrentTool(TOOL_IDS.CAMERA),
      },
    };
  },
};

const components: TLUiComponents = {
  Toolbar: (props) => {
    return (
      <DefaultToolbar {...props}>
        <DefaultToolbarContent />
        <ToolbarItem tool={TOOL_IDS.PIN} />
        <ToolbarItem tool={TOOL_IDS.CAMERA} />
      </DefaultToolbar>
    );
  },
};

export function CanvasEditor({ pages }: CanvasEditorProps) {
  const handleMount = (editor: Editor) => {
    // When the editor mounts, and we have PDF pages, create the shapes
    if (pages && pages.length > 0) {
      // Clear the canvas first just in case
      editor.selectAll();
      editor.deleteShapes(editor.getSelectedShapeIds());
      
      createPdfShapes(editor, pages);
    }
  };

  return (
    <div className="h-full w-full">
      <Tldraw
        onMount={handleMount}
        shapeUtils={customShapeUtils}
        tools={customTools}
        bindingUtils={customBindingUtils}
        overrides={uiOverrides}
        components={components}
        autoFocus
      />
    </div>
  );
}
