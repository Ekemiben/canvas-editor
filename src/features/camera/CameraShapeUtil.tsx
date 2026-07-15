import { BaseBoxShapeUtil, HTMLContainer, T } from 'tldraw';
import { SHAPE_TYPES, UI_CONSTANTS } from '@/constants';
import type { CameraShape } from './types';

export class CameraShapeUtil extends BaseBoxShapeUtil<CameraShape> {
  static override type = 'camera' as const;

  static override props = {
    w: T.number,
    h: T.number,
  };

  override getDefaultProps(): CameraShape['props'] {
    return {
      w: 400,
      h: 300,
    };
  }

  // Camera region can be resized
  override canResize() {
    return true;
  }

  override getIndicatorPath(shape: CameraShape) {
    const path = new Path2D();
    path.rect(0, 0, shape.props.w, shape.props.h);
    return path;
  }

  override component(shape: CameraShape) {
    const handleExport = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Camera capture triggered for shape:", shape.id);
      
      const allShapeIds = Array.from(this.editor.getCurrentPageShapeIds());
      console.log("All shapes on page:", allShapeIds);

      // Filter out the camera shapes themselves so they aren't visible in the export
      const exportShapeIds = allShapeIds.filter(id => {
        const s = this.editor.getShape(id);
        return s && s.type !== 'camera';
      });
      console.log("Shapes to export:", exportShapeIds);

      // Get page bounds of the camera
      const bounds = this.editor.getShapePageBounds(shape.id);
      console.log("Camera bounds:", bounds);
      
      if (bounds) {
        try {
          // Use the editor.toImage API to render the cropped canvas area directly to a Blob
          const result = await this.editor.toImage(exportShapeIds, {
            format: 'png',
            bounds: bounds,
            background: true, // Export with background
          });

          console.log("toImage result:", result);

          if (result && result.blob) {
            // Trigger an automatic programmatic browser download of the blob
            const url = URL.createObjectURL(result.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `capture-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log("Download triggered successfully.");
          } else {
            console.warn("No blob returned from toImage.");
          }
        } catch (err) {
          console.error("Export failed:", err);
        }
      } else {
        console.warn("Could not determine camera bounds.");
      }
    };

    const stopPropagation = (e: React.PointerEvent | React.MouseEvent) => {
      e.stopPropagation();
    };

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          width: '100%',
          height: '100%',
          border: '2px dashed #3B82F6', // Blue dashed border
          backgroundColor: 'rgba(59, 130, 246, 0.05)', // Very light blue tint
          pointerEvents: 'all',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <button
          onClick={handleExport}
          onPointerDown={stopPropagation}
          onPointerUp={stopPropagation}
          style={{
            pointerEvents: 'all',
            padding: '4px 8px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '0 0 4px 0',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1000,
          }}
        >
          Capture
        </button>
      </HTMLContainer>
    );
  }
}
