import React, { useRef, useEffect } from 'react';

type Props = {
  canvasWidth: number;
  canvasHeight: number;
}

const Canvas: React.FC<Props> = ({ canvasWidth, canvasHeight }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 10;

      canvas.addEventListener('mousedown', (e) => {
        isDrawing.current = true;
        lastX.current = e.offsetX;
        lastY.current = e.offsetY;
      });

      canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing.current) return;
        ctx.beginPath();
        ctx.moveTo(lastX.current, lastY.current);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX.current = e.offsetX;
        lastY.current = e.offsetY;
      });

      canvas.addEventListener('mouseup', () => {
        isDrawing.current = false;
      });

      canvas.addEventListener('mouseout', () => {
        isDrawing.current = false;
      });
    }
  }, [canvasHeight, canvasWidth]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default Canvas;
