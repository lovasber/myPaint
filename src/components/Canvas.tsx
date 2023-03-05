import React, { useEffect } from 'react'
import rough from 'roughjs'
import { Drawable } from 'roughjs/bin/core'
import Element from '../interfaces/Element'


const Canvas = () => {
    const generator = rough.generator()
    const [elements, setElements] = React.useState([] as Element[])
    const [drawing, setDrawing] = React.useState(false as boolean)

    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.clearRect(0, 0, canvas.width, canvas.height)

        const roughCanvas = rough.canvas(canvas)

        elements.forEach(({line}) => {
            roughCanvas.draw(line as Drawable)
        })
        

    }, [elements])

    //V2
    const createElement = (x1: number, y1: number, x2: number, y2: number) =>{
        const line = generator.line(x1, y1, x2, y2)
        return { x1, y1, x2, y2, line}
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        setDrawing(true)
        const { clientX, clientY } = event
        console.log({event})
        console.log(event.clientX, event.clientY)
        
        const element = createElement(clientX, clientY, clientX, clientY)
        setElements(prevState => [...prevState, element])
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if(!drawing) return

        const {clientX, clientY } = event

        const lastIndex : number = elements.length - 1
        const { x1, y1 } = elements[lastIndex]

        const updatedElement = createElement(x1, y1, clientX, clientY)

        const tempElements = [...elements]
        tempElements[lastIndex] = updatedElement
        setElements(tempElements)
        //console.log({lastIndex})
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        setDrawing(false)
    }

    const canvasStyle = {
        backgroundColor: '#424242',
      }

    return (
        <div>
          <canvas   
              id='canvas' 
              style={canvasStyle}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              width={window.innerWidth}
              height={window.innerHeight-75}
          >
          </canvas>
        </div>
        
    )
}

export default Canvas