import { BaseBoxShapeTool } from 'tldraw';
import { TOOL_IDS } from '@/constants';

export class CameraTool extends BaseBoxShapeTool {
  static override id = TOOL_IDS.CAMERA;
  static override initial = 'idle';

  override shapeType = 'camera' as const;
}
