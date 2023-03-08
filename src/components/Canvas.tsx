import React, { useEffect, useState } from 'react'
import rough from 'roughjs'
import { Drawable, ResolvedOptions } from 'roughjs/bin/core'
import Element from '../interfaces/Element'
import { shape, actionName } from '../interfaces/Enums'

type prop = {
    toolName: string,
    cursor: string
}

const HEADER_HEIGHT = 75

const Canvas = ({ toolName, cursor }: prop ) => {
    const generator = rough.generator()
    const [elements, setElements] = useState([] as Element[])
    const [action, setAction] = useState('none' as string)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight - HEADER_HEIGHT)
    const [selectedElement, setSelectedElement] = useState(null as unknown as Element)
    const [elementToDelete, setElementToDelete] = useState(null as unknown as Element)

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

    document.addEventListener('resize',(): void =>{
        updateUI()
        setScreenWidth(window.innerWidth)
        setHeight(window.innerHeight - HEADER_HEIGHT)
    })
    
    useEffect(() => {
        document.addEventListener('keydown', (event ): void =>{
            if(event.key === 'Delete'){
                
                if(toolName === actionName.TODELETE){
                    if(!!elementToDelete){
                        console.log("delete element")
                        deleteElement(elementToDelete.id)
                    }
                }
            }
        })
    }, [])

    const createElement = (id:number, x1: number, y1: number, x2: number, y2: number, type: string, options?: ResolvedOptions) : Element =>{
        const roughElement = createShape(x1, y1, x2, y2, type, options)
        return { id, x1, y1, x2, y2, type, roughElement}
    }

    const createShape = (x1: number, y1: number, x2: number, y2: number, type: string, options?: ResolvedOptions): Drawable  =>  {
        if(type === shape.LINE){
            return generator.line(x1, y1, x2, y2, options)
        }else if(type === shape.RECTANGLE){
            return generator.rectangle(x1, y1, x2-x1, y2-y1, options)
        }else{
            console.error("unidentified Shape!")
            return generator.line(10,10,10,10)
        }        
    }

    const getElementAtPosition = (clientX: number, clientY: number, elements: Element[]): Element | undefined => {
        return elements.find((element)=> isWithinElement(clientX, clientY, element))
    }

    const isWithinElement = (x: number, y: number, element: Element) =>{
        if(element.type === shape.RECTANGLE){
            return isInRectangle(x, y, element)
        }else if(element.type === shape.LINE){
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

    const updateElement = (id: number, x1: number, y1: number, clientX: number, clientY: number, element: Element, options?: ResolvedOptions) =>{
        const updatedElement = createElement(id, x1, y1, clientX, clientY, element.type, options)
        const tempElements = [...elements]
        tempElements[id] = updatedElement
        setElements(tempElements)
    }

    const deleteElement = (id: number) =>{
        const tempElements = [...elements]
        tempElements.splice(id, 1)
        setElements(tempElements)
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        const { clientX, clientY } = event
        
        if(toolName === actionName.SELECTING){
            setAction(actionName.MOVING)
            const element : Element | undefined = getElementAtPosition(clientX, clientY, elements)
            if(!!element){
                setSelectedElement(element)
                const offsetX = clientX - element.x1
                const offsetY = clientY - element.y1
                setSelectedElement({...element, offsetX, offsetY })
                setAction(actionName.MOVING)
            }
        }else if(toolName === actionName.TODELETE){
            const { clientX, clientY } = event
            const element : Element | undefined = getElementAtPosition(clientX, clientY, elements)
            if(!!element){
                setStrokeLineDash(element)
                resetAllOtherStrokeLineDash(element.id)
                setElementToDelete(element)
            }else{
                console.log("no element to delete")
            }
        }else{
            setAction(actionName.DRAWING)
            const id = elements.length
            const element = createElement(id, clientX, clientY, clientX, clientY, toolName)
            setElements(prevState => [...prevState, element as Element])
        }  
    }

    const setStrokeLineDash = (element: Element) => {
        const tempElement = {...element}
        tempElement.roughElement.options.strokeLineDash = [25]
        const options = tempElement.roughElement.options
        updateElement(element.id, element.x1, element.y1, element.x2, element.y2, tempElement, options)
    }


    const resetAllOtherStrokeLineDash = (id: number) =>{
        const tempElements = [...elements]
        tempElements.forEach((element, index) => {
            if(index !== id){
                element.roughElement.options.strokeLineDash = []
            }
        })
        setElements(tempElements)
    }

    const handleMouseMove = (event : React.MouseEvent) => {
        const {clientX, clientY } = event
        if(action === actionName.DRAWING){            
            const index : number = elements.length - 1
            const { x1, y1 } = elements[index]
            updateElement(index, x1, y1, clientX, clientY, elements[index],)
        }else if(action === actionName.MOVING){
            if(!!selectedElement){
                const { id, x1, y1, x2, y2, offsetX, offsetY } = selectedElement
                const width = x2 -x1;
                const height = y2 - y1
                const newX = clientX - offsetX!
                const newY = clientY - offsetY!
                updateElement(id, newX, newY, newX + width, newY + height, selectedElement)
            }
        }
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        setAction('none')
        setSelectedElement(null as unknown as Element)
    }

    const canvasStyle = {
        backgroundColor: '#424242',
        cursor: `${cursor}`
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