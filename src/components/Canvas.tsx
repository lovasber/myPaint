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

        elements.forEach(({roughElement}) => {
            roughCanvas.draw(roughElement as Drawable)
        })
        

    }, [elements])

    //V2
    const createElement = (x1: number, y1: number, x2: number, y2: number) =>{
        const roughElement = generator.line(x1, y1, x2, y2)
        return { x1, y1, x2, y2, roughElement}
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setDrawing(true)
        const {clientX, clientY } = e
        
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
        console.log({lastIndex})
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        setDrawing(false)
    }
    
    /*
    //V1

    const createElement = (x1: number, y1: number, x2: number, y2: number) => {
        const roughElement = generator.line(x1, y1, x2, y2);
        return {x1, y1, x2, y2, roughElement}
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setDrawing(true)
        const { clientX, clientY } = e as React.MouseEvent
        const element = createElement(clientX, clientY, clientX, clientY)
        setElements((prevState)=>[...prevState, element])
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (drawing) {
            const { clientX, clientY } = e as React.MouseEvent
            const lastIndex : number = elements.length - 1
            const { x1, y1 } = elements[lastIndex]
            const updatedElement = createElement(x1, y1, clientX, clientY)
            
            const elementsCopy = [...elements]
            elementsCopy[lastIndex] = updatedElement
            setElements(elementsCopy)
            console.log(x1, y1, clientX, clientY)
        }
    }
    

    const handleMouseUp = (e: React.MouseEvent) => {
        setDrawing(false)
    }
*/

    const canvasStyle = {
        /*width: window.innerWidth,
        height: window.innerHeight,
        */
        width: '100%',
        height: '100%',
        backgroundColor: '#424242',
      }

    return (
        <canvas 
            id='canvas' 
            style={canvasStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
        </canvas>
    )
}

export default Canvas