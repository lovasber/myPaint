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
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight - HEADER_HEIGHT)
    const [selectedElement, setSelectedElement] = useState(null as unknown as Element)

    const updateUI = () =>{
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.clearRect(0, 0, screenWidth, height)

        const roughCanvas = rough.canvas(canvas)

        elements.forEach(({roughElement}) => {
            roughCanvas.draw(roughElement as Drawable)
        })
    }
    
    useEffect(() => {
        updateUI()
    }, [elements])

    addEventListener('resize',()=>{
        updateUI()
        setScreenWidth(window.innerWidth)
        setHeight(window.innerHeight - HEADER_HEIGHT)
    })

    const createElement = (id:number, x1: number, y1: number, x2: number, y2: number, type: string) : Element =>{

        const roughElement = createShape(x1, y1, x2, y2, type)
        return { id, x1, y1, x2, y2, type:toolName, roughElement}
    }

    const getElementAtPosition = (clientX: number, clientY: number, elements: Element[]): Element | undefined => {
        return elements.find((element)=> isWithinElement(clientX, clientY, element))
    }

    const isWithinElement = (x: number, y: number, element: Element) =>{
        if(element.type === 'rectangle'){
            return isInRectangle(x, y, element)
        }else if(element.type === 'line'){
            return isInLine(x, y, element)
        }
    }

    const isInRectangle = (x: number, y: number, element: Element) => {
        const { x1, x2, y1, y2} = element
        const minX = Math.min(x1, x2)
        const maxX = Math.max(x1, x2)
        const minY = Math.min(y1, y2)
        const maxY = Math.max(y1, y2)

        return x >= minX && x <= maxX && y >= minY && y <= maxY
    }

    const isInLine = (x: number, y: number, element: Element) =>{
        const a = { x: element.x1, y: element.y1}
        const b = { x: element.x2, y: element.y2}
        const c = { x, y }
        const offset = distance(a, b) -(distance(a, c) + distance(b,c))
        return Math.abs(offset) < 1
    }

    const distance = (a: { x: number, y: number}, b: { x: number, y: number}) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) 

    const createShape = (x1: number, y1: number, x2: number, y2: number, type: string): Drawable  =>  {
        if(type === 'line'){
            return generator.line(x1, y1, x2, y2)
        }else if(toolName === 'rectangle'){
            return generator.rectangle(x1, y1, x2-x1, y2-y1)
        }else{
            console.error("unidentified Shape!")
            return generator.line(0,0,0,0)
        }        
    }

    const updateElement = (id: number, x1: number, y1: number, clientX: number, clientY: number, element: Element) =>{

        const updatedElement = createElement(id, x1, y1, clientX, clientY, element.type)

        const tempElements = [...elements]
        tempElements[id] = updatedElement
        setElements(tempElements)
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        const { clientX, clientY } = event
        
        if(toolName === 'select'){
            const element : Element | undefined = getElementAtPosition(clientX, clientY, elements)
            console.log(element)
            if(element){
                const offsetX = clientX - element.x1
                const offsetY = clientY - element.y1

                setAction('moving')
                

            }
        }else{
            setAction('drawing')
            const id = elements.length
            const element = createElement(id, clientX, clientY, clientX, clientY, toolName)
            setElements(prevState => [...prevState, element as Element])
        }
        
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        const {clientX, clientY } = event
        if(action === 'drawing'){            
            const index : number = elements.length - 1
            const { x1, y1 } = elements[index]
            updateElement(index, x1, y1, clientX, clientY, elements[index])
        }else if(action === 'moving'){
           const { id, x1, y1, x2, y2 } = selectedElement
           const width = x2 -x1;
           const height = y2 - y1
           updateElement(id, clientX, clientY, clientX + width, clientY + height, selectedElement)
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
              width={screenWidth}
              height={height}
          >
          </canvas>
        </div>
        
    )
}

export default Canvas