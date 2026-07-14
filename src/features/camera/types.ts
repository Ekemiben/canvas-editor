import { TLBaseShape } from 'tldraw';
import { SHAPE_TYPES } from '@/constants';

export interface CameraShapeProps {
  w: number;
  h: number;
}

declare module '@tldraw/tlschema' {
  interface TLGlobalShapePropsMap {
    'camera': CameraShapeProps;
  }
}

export type CameraShape = TLBaseShape<
  typeof SHAPE_TYPES.CAMERA,
  CameraShapeProps
>;
