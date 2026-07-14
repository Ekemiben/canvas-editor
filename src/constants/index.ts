// Shape Types
export const SHAPE_TYPES = {
  PIN: 'pin',
  CAMERA: 'camera',
} as const;

// Tool IDs
export const TOOL_IDS = {
  PIN: 'pin-tool',
  CAMERA: 'camera-tool',
} as const;

// Binding Types
export const BINDING_TYPES = {
  PIN: 'pin-binding',
} as const;

// Constants
export const UI_CONSTANTS = {
  PDF_UPLOAD_MAX_PAGES: 100, // Safe limit for canvas rendering
  CAMERA_MIN_SIZE: 50,
  PIN_SIZE: { w: 24, h: 36 },
} as const;
