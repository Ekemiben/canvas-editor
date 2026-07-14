import { BindingUtil, BindingOnShapeChangeOptions } from '@tldraw/editor';
import { BINDING_TYPES, SHAPE_TYPES } from '@/constants';
import type { PinBinding } from './types';

export class PinBindingUtil extends BindingUtil<PinBinding> {
  static override type = 'pin-binding' as const;

  override getDefaultProps(): PinBinding['props'] {
    return {
      offset: { x: 0, y: 0 },
    };
  }

  // When the 'to' shape moves (e.g. user drags shape B)
  // We need to move the 'from' shape (shape A) to maintain the offset
  override onAfterChangeToShape({ binding, shapeAfter }: BindingOnShapeChangeOptions<PinBinding>) {
    const fromShape = this.editor.getShape(binding.fromId);
    if (!fromShape) return;

    // Calculate target position based on the stored offset
    const targetX = shapeAfter.x + binding.props.offset.x;
    const targetY = shapeAfter.y + binding.props.offset.y;

    // Only update if it actually moved, to prevent infinite loops
    if (Math.abs(fromShape.x - targetX) > 0.01 || Math.abs(fromShape.y - targetY) > 0.01) {
      this.editor.updateShape({
        id: fromShape.id,
        type: fromShape.type,
        x: targetX,
        y: targetY,
      });
    }
  }

  // When the 'from' shape moves (e.g. user drags shape A)
  // We need to move the 'to' shape (shape B) to maintain the offset
  override onAfterChangeFromShape({ binding, shapeAfter }: BindingOnShapeChangeOptions<PinBinding>) {
    const toShape = this.editor.getShape(binding.toId);
    if (!toShape) return;

    // Calculate target position for shape B (subtract offset)
    const targetX = shapeAfter.x - binding.props.offset.x;
    const targetY = shapeAfter.y - binding.props.offset.y;

    if (Math.abs(toShape.x - targetX) > 0.01 || Math.abs(toShape.y - targetY) > 0.01) {
      this.editor.updateShape({
        id: toShape.id,
        type: toShape.type,
        x: targetX,
        y: targetY,
      });
    }
  }
}
