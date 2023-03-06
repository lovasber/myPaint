import React, { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

type ShapeType = 'rectangle' | 'line';

interface Shape {
  type: ShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

interface PaintState {
  shapes: Shape[];
  selectedShapeIndex: number | null;
  isDragging: boolean;
  dragStart: { x: number; y: number } | null;
}

type prop = {
  toolName: string
}

const Paint = ({ toolName } : prop) => {
  // Create state to store the shapes, the index of the selected shape,
  // whether the user is currently dragging a shape, and the position of
  // the drag start.
  const [paintState, setPaintState] = useState<PaintState>({
    shapes: [],
    selectedShapeIndex: null,
    isDragging: false,
    dragStart: null,
  });

  // Handle mouse down events on the canvas. When the user clicks on the
  // canvas, we create a new shape with its initial position set to the
  // mouse coordinates, and add it to the shapes array. We also select
  // the new shape and begin a drag operation.
  const handleMouseDown = (event: any) => {
    const { layerX, layerY } = event.evt;
    const newShape: Shape = {
      type: 'rectangle',
      x: layerX,
      y: layerY,
      width: 0,
      height: 0,
    };
    setPaintState({
      ...paintState,
      shapes: [...paintState.shapes, newShape],
      selectedShapeIndex: paintState.shapes.length,
      isDragging: true,
      dragStart: { x: layerX, y: layerY },
    });
  };

  // Handle mouse move events on the canvas. When the user moves the mouse,
  // if a shape is currently being dragged, we update its position based on
  // the current mouse position and the position where the drag operation
  // started.
  const handleMouseMove = (event: any) => {
    if (!paintState.isDragging || paintState.selectedShapeIndex === null) {
      return;
    }

    const { layerX, layerY } = event.evt;
    const dragStart = paintState.dragStart;
    const selectedShape = paintState.shapes[paintState.selectedShapeIndex];
    const newWidth = dragStart ? layerX - dragStart.x : 0;
    const newHeight = dragStart ? layerY - dragStart.y : 0;
    let updatedShape = { ...selectedShape };
    if (selectedShape.type === 'rectangle') {
      updatedShape.width = newWidth;
      updatedShape.height = newHeight;
    }
    setPaintState({
      ...paintState,
      shapes: [
        ...paintState.shapes.slice(0, paintState.selectedShapeIndex),
        updatedShape,
        ...paintState.shapes.slice(paintState.selectedShapeIndex + 1),
      ],
    });
  };

  // Handle mouse up events on the canvas. When the user releases the mouse,
  // we end the drag operation by clearing the drag start position.
  const handleMouseUp = () => {
    setPaintState({
      ...paintState,
      isDragging: false,
      dragStart: null,
    });
  };

  // Handle key down events on the canvas. If the user presses the Delete key
  // and a shape is currently selected, we remove the selected shape from the
  // shapes array.
  const handleKeyDown = (event: any) => {
    if (event.key === 'Delete' &&
    paintState.selectedShapeIndex !== null
  ) {
    setPaintState({
      ...paintState,
      shapes: [
        ...paintState.shapes.slice(0, paintState.selectedShapeIndex),
        ...paintState.shapes.slice(paintState.selectedShapeIndex + 1),
      ],
      selectedShapeIndex: null,
    });
  }};

  // Handle click events on a shape. When the user clicks on a shape, we
  // select it.
  const handleShapeClick = (index: number) => {
  setPaintState({
  ...paintState,
  selectedShapeIndex: index,
  });
  };
  
  // Render the shapes on the canvas.
  const renderShapes = () => {
  return paintState.shapes.map((shape, index) => {
  if (shape.type === 'rectangle') {
  return (
  <Rect
  key={index}
  x={shape.x}
  y={shape.y}
  width={shape.width}
  height={shape.height}
  stroke="black"
  strokeWidth={2}
  onClick={() => handleShapeClick(index)}
  draggable
  onDragStart={() =>
  setPaintState({
  ...paintState,
  selectedShapeIndex: index,
  isDragging: true,
  dragStart: null,
  })
  }
  onDragMove={(event: any) => {
  handleMouseMove(event);
  }}
  onDragEnd={() => {
  handleMouseUp();
  }}
  />
  );
  }
  return null;
  });
  };
  
  // Render the canvas.
  return (
  <Stage
     width={window.innerWidth}
     height={window.innerHeight}
     onMouseDown={handleMouseDown}
     onMouseMove={handleMouseMove}
     onMouseUp={handleMouseUp}
     onKeyDown={handleKeyDown}
     tabIndex={0}
   >
  <Layer>{renderShapes()}</Layer>
  </Stage>
  );
  };
  
  export default Paint;
