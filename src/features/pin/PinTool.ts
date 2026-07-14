import { StateNode, createShapeId } from 'tldraw';
import { SHAPE_TYPES, TOOL_IDS, UI_CONSTANTS, BINDING_TYPES } from '@/constants';

export class PinTool extends StateNode {
  static override id = TOOL_IDS.PIN;

  override onEnter() {
    this.editor.setCursor({ type: 'cross', rotation: 0 });
  }

  override onPointerUp() {
    // 1. Get the current pointer position in page coordinates
    const point = this.editor.inputs.getCurrentPagePoint();
    
    // 2. Create the pin shape at that position
    // We center the pin by subtracting half its width and its full height 
    // so the pointy bottom part lands exactly at the cursor point
    const pinId = createShapeId();
    this.editor.createShape({
      id: pinId,
      type: SHAPE_TYPES.PIN,
      x: point.x - UI_CONSTANTS.PIN_SIZE.w / 2,
      y: point.y - UI_CONSTANTS.PIN_SIZE.h,
    });

    // 3. Find all shapes at the cursor point (excluding our new pin)
    const shapesAtPoint = this.editor.getShapesAtPoint(point);
    const overlappingShapes = shapesAtPoint.filter(shape => shape.type !== SHAPE_TYPES.PIN);

    // 4. If there are >= 2 overlapping shapes, bind them together
    if (overlappingShapes.length >= 2) {
      this.editor.run(() => {
        // Bind every shape to the first shape to keep them all in sync
        const baseShape = overlappingShapes[0];
        
        for (let i = 1; i < overlappingShapes.length; i++) {
          const targetShape = overlappingShapes[i];
          
          // Calculate offset: baseShape position - targetShape position
          const offsetX = baseShape.x - targetShape.x;
          const offsetY = baseShape.y - targetShape.y;
          
          this.editor.createBinding({
            type: BINDING_TYPES.PIN,
            fromId: baseShape.id,
            toId: targetShape.id,
            props: {
              offset: { x: offsetX, y: offsetY }
            }
          });
        }
        
        // Also bind the pin to the base shape so it moves with the group
        const pinOffsetX = baseShape.x - (point.x - UI_CONSTANTS.PIN_SIZE.w / 2);
        const pinOffsetY = baseShape.y - (point.y - UI_CONSTANTS.PIN_SIZE.h);
        
        this.editor.createBinding({
          type: BINDING_TYPES.PIN,
          fromId: baseShape.id,
          toId: pinId,
          props: {
            offset: { x: pinOffsetX, y: pinOffsetY }
          }
        });
      });
    }

    // 5. Switch back to the select tool automatically
    this.editor.setCurrentTool('select');
  }
}
