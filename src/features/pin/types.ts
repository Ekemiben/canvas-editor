import { TLBaseShape, TLBaseBinding, VecModel } from 'tldraw';
import { SHAPE_TYPES, BINDING_TYPES } from '@/constants';

// Props for the pin binding
export interface PinBindingProps {
  // The exact relative offset vector from the source shape's (fromId) position
  // to the target shape's (toId) position when the binding was created.
  offset: VecModel;
}

// Register the custom binding type with tldraw's type system via module augmentation
declare module '@tldraw/tlschema' {
  interface TLGlobalBindingPropsMap {
    'pin-binding': PinBindingProps;
  }
  interface TLGlobalShapePropsMap {
    'pin': { w: number; h: number };
  }
}

// The shape that represents the visual pin on the canvas
export type PinShape = TLBaseShape<
  typeof SHAPE_TYPES.PIN,
  {
    w: number;
    h: number;
  }
>;

// The binding that links two shapes together via a pin
export type PinBinding = TLBaseBinding<
  typeof BINDING_TYPES.PIN,
  PinBindingProps
>;
