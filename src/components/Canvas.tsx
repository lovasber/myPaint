import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

type Props = {
  canvasWidth: number;
  canvasHeight: number;
};

const Canvas: React.FC<Props> = ({ canvasWidth, canvasHeight }) => {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5>();
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isDrawing = useRef(false);

  const setupSketch = (p: p5, canvasParentElement: Element | null) => {
    if (canvasParentElement) {
      // Set up canvas
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      canvas.parent(canvasParentElement);
  
      // Set up stroke
      p.stroke(0);
      p.strokeWeight(10);
      p.noFill();
  
      // Draw straight line on mouse release
      canvas.mousePressed(() => {
        startXRef.current = p.mouseX;
        startYRef.current = p.mouseY;
        isDrawing.current = true;
      });
  
      canvas.mouseReleased(() => {
        isDrawing.current = false;
        p.rect(startXRef.current, startYRef.current, p.mouseX, p.mouseY);
      });
    }
  };
  

  useEffect(() => {
    if (canvasParentRef.current) {
      // Create new p5 instance with sketch
      p5Ref.current = new p5((p: p5) => {
        setupSketch(p, canvasParentRef.current);
      });
    }

    // Clean up p5 instance on unmount
    return () => {
      p5Ref.current?.remove();
    };
  }, []);

  useEffect(() => {
    // Resize canvas when props change
    if (p5Ref.current) {
      p5Ref.current.resizeCanvas(canvasWidth, canvasHeight);
    }
  }, [canvasWidth, canvasHeight]);

  return <div ref={canvasParentRef} />;
};

export default Canvas;
