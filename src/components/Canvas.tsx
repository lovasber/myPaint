import React, { useState, useEffect, useRef, useLayoutEffect  } from 'react';
import { fabric } from "fabric";

type prop = {
    toolName: string
}

const HEADER_HEIGHT = 75

const Canvas = ({ toolName }: prop ) => {
  const [isDrawing, setIsDrawing] = useState(false as boolean)
  var rect: { set: (arg0: { left?: number; top?: number; width?: number; height?: number; }) => void; } 
  
  const isSelecting = () : boolean => toolName === 'line' || toolName === 'rectangle'

  useEffect(() => {
   
      const canvas = new fabric.Canvas('canvas', {
        height: 800,
        width: 800,
        fireRightClick: true,
        fireMiddleClick: true,
        stopContextMenu: true,
        backgroundColor: undefined,
        backgroundImage: undefined,
      });

      

      canvas.on("mouse:down", (e)=>{
        if(!isSelecting()) 
        console.log("I'm gonna draw")
        var pointer = canvas.getPointer(e.e);
        var origX = pointer.x;
        var origY = pointer.y;
        var pointer = canvas.getPointer(e.e);
        
        const rect = new fabric.Rect({
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          width: 61,
          height: 61,
          angle: 0,
          fill: 'rgba(255,0,0,0.5)',
          transparentCorners: false
        })
        
       /*
        const line = new fabric.Line([50,10,200,150],{
          left: origX,
          top: origY,
          originX: 'left',
          originY: 'top',
          angle: 0,
          fill: 'rgba(255,0,0,0.5)',
          transparentCorners: false
        })
        */
        canvas.add(rect);
      })

      canvas.on('mouse:move', (e)=>{
        
        if (!isDrawing) return;

        const { x, y } = canvas.getPointer(e.e);
        var pointer = canvas.getPointer(e.e);
    
        if(x>pointer.x){
            rect.set({ left: Math.abs(pointer.x) });
        }
        if(y>pointer.y){
            rect.set({ top: Math.abs(pointer.y) });
        }
    
        rect.set({ width: Math.abs(x - pointer.x) });
        rect.set({ height: Math.abs(y - pointer.y) });
    
    
        canvas.renderAll();
      });

      canvas.on('mouse:up', function(o){
       setIsDrawing(false)
      });
      
      
    }, [])
    return (
        <div>
            <canvas id="canvas" />
        </div>
    );
        
}

export default Canvas