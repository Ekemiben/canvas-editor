import { BaseBoxShapeUtil, HTMLContainer, T } from 'tldraw';
import { SHAPE_TYPES, UI_CONSTANTS } from '@/constants';
import type { PinShape } from './types';

export class PinShapeUtil extends BaseBoxShapeUtil<PinShape> {
  static override type = 'pin' as const;

  static override props = {
    w: T.number,
    h: T.number,
  };

  override getDefaultProps(): PinShape['props'] {
    return {
      w: UI_CONSTANTS.PIN_SIZE.w,
      h: UI_CONSTANTS.PIN_SIZE.h,
    };
  }

  // Prevent resizing or rotating the pin
  override canResize() {
    return false;
  }


  override component(shape: PinShape) {
    return (
      <HTMLContainer
        id={shape.id}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
        >
          {/* Map pin vector graphic */}
          <path
            d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 36 12 36C12 36 24 21 24 12C24 5.37258 18.6274 0 12 0Z"
            fill="#EF4444" // Red color
            stroke="#B91C1C"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="4" fill="white" />
        </svg>
      </HTMLContainer>
    );
  }

  override getIndicatorPath(shape: PinShape) {
    const path = new Path2D();
    path.rect(0, 0, shape.props.w, shape.props.h);
    return path;
  }
}
