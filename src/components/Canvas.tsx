import React, { useEffect, useState } from 'react'
import rough from 'roughjs'
import { Drawable } from 'roughjs/bin/core'
import Element from '../interfaces/Element'

type prop = {
    toolName: string
}

const HEADER_HEIGHT = 75

const Canvas = ({ toolName }: prop ) => {
    const generator = rough.generator()
    const [elements, setElements] = useState([] as Element[])
    const [action, setAction] = useState('none' as string)
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight - HEADER_HEIGHT)
    const [selectedElement, setSelectedElement] = useState(null as unknown as Element)
    
    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.clearRect(0, 0, width, height)

        const roughCanvas = rough.canvas(canvas)

        elements.forEach(({roughElement}) => {
            roughCanvas.draw(roughElement as Drawable)
        })

        

    }, [elements])

    addEventListener('resize',()=>{
        setWidth(window.innerWidth)
        setHeight(window.innerHeight - HEADER_HEIGHT)
    })

    const createElement = (id:number, x1: number, y1: number, x2: number, y2: number) : Element =>{

        const roughElement = createShape(x1, y1, x2, y2)
        return { id, x1, y1, x2, y2, type:toolName, roughElement}
    }

    const getElementAtPosition = (clientX: number, clientY: number, elements: Element[]): Element | undefined => {
        return elements.find((element)=> isInRectangle(clientX, clientY, element))
    }

    const isInRectangle = (x: number, y: number, element: Element) => {
        const { x1, x2, y1, y2} = element
        const minX = Math.min(x1, x2)
        const maxX = Math.max(x1, x2)
        const minY = Math.min(y1, y2)
        const maxY = Math.max(y1, y2)

        return x >= minX && x <= maxX && y >= minY && y <= maxY
    }

    const createShape = (x1: number, y1: number, x2: number, y2: number): Drawable  =>  {
        if(toolName === 'line'){
            return generator.line(x1, y1, x2, y2)
        }else if(toolName === 'rectangle'){
            return generator.rectangle(x1, y1, x2-x1, y2-y1)
        }else{
            console.error("unidentified Shape!")
            return generator.line(0,0,0,0)
        }        
    }

    const updateElement = (id: number, x1: number, y1: number, clientX: number, clientY: number) =>{

        const updatedElement = createElement(id, x1, y1, clientX, clientY)

        const tempElements = [...elements]
        tempElements[id] = updatedElement
        setElements(tempElements)
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        const { clientX, clientY } = event
        const id = elements.length
        if(toolName === 'select'){
            const element : Element | undefined = getElementAtPosition(clientX, clientY, elements)
            
            if(element){
                setAction('moving')
                setSelectedElement(element)
            }
        }else{
            setAction('drawing')
            
            
            const element = createElement(id, clientX, clientY, clientX, clientY)
            setElements(prevState => [...prevState, element as Element])
        }
        
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if(action === 'drawing'){
            const {clientX, clientY } = event

            const index : number = elements.length - 1
            const { x1, y1} = elements[index]
            updateElement(index, x1, y1, clientX, clientY)
        }else if(action === 'moving'){
           const { id, x1, y1, x2, y2} = selectedElement
           //updateElement(id, x)
        }
        
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        setAction('none')
        setSelectedElement(null as unknown as Element)
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
              width={width}
              height={height}
          >
          </canvas>
        </div>
        
    )
}

export default Canvas