import { StateNode, TLPointerEventInfo, createShapeId } from 'tldraw';
import { SHAPE_TYPES, TOOL_IDS, UI_CONSTANTS, BINDING_TYPES } from '@/constants';

export class PinTool extends StateNode {
  static override id = TOOL_IDS.PIN;

  override onEnter() {
    this.editor.setCursor({ type: 'cross', rotation: 0 });
  }

  override onExit() {
    this.editor.setCursor({ type: 'default', rotation: 0 });
  }

  override onPointerUp(_info: TLPointerEventInfo) {
    // 1. Get the current pointer position in page coordinates
    //    Use editor.inputs.getCurrentPagePoint()
    const point = this.editor.inputs.getCurrentPagePoint();

    // 2. Pre-generate a stable ID so we can reference it in bindings
    const pinId = createShapeId();

    // 3. Create the pin shape at that position
    //    Center the pin horizontally; the pointy tip (bottom) lands at the click point.
    this.editor.createShape({
      id: pinId,
      type: SHAPE_TYPES.PIN,
      x: point.x - UI_CONSTANTS.PIN_SIZE.w / 2,
      y: point.y - UI_CONSTANTS.PIN_SIZE.h,
      props: {
        w: UI_CONSTANTS.PIN_SIZE.w,
        h: UI_CONSTANTS.PIN_SIZE.h,
      },
    });

    // 4. Find all shapes at the cursor point (excluding our new pin and camera shapes)
    const shapesAtPoint = this.editor.getShapesAtPoint(point, { hitInside: true });
    const overlappingShapes = shapesAtPoint.filter(
      (shape) =>
        shape.id !== pinId &&
        shape.type !== SHAPE_TYPES.PIN &&
        shape.type !== SHAPE_TYPES.CAMERA
    );

    // 5. If there are >= 2 overlapping target shapes, bind them together via the pin
    if (overlappingShapes.length >= 2) {
      this.editor.run(() => {
        // Use the topmost shape as the "anchor" that others follow
        const baseShape = overlappingShapes[0];

        // Bind each subsequent shape to the base shape
        for (let i = 1; i < overlappingShapes.length; i++) {
          const targetShape = overlappingShapes[i];

          // The offset records how far baseShape is from targetShape at creation time.
          // When baseShape moves, targetShape will be placed at: baseShape.pos - offset
          const offsetX = baseShape.x - targetShape.x;
          const offsetY = baseShape.y - targetShape.y;

          this.editor.createBinding({
            type: BINDING_TYPES.PIN,
            fromId: baseShape.id,
            toId: targetShape.id,
            props: {
              offset: { x: offsetX, y: offsetY },
            },
          });
        }

        // Also bind the pin visual to the base shape so it follows the group
        const pinOffsetX = baseShape.x - (point.x - UI_CONSTANTS.PIN_SIZE.w / 2);
        const pinOffsetY = baseShape.y - (point.y - UI_CONSTANTS.PIN_SIZE.h);

        this.editor.createBinding({
          type: BINDING_TYPES.PIN,
          fromId: baseShape.id,
          toId: pinId,
          props: {
            offset: { x: pinOffsetX, y: pinOffsetY },
          },
        });
      });
    }

    // 6. Switch back to the select tool automatically
    this.editor.setCurrentTool('select');
  }
}
