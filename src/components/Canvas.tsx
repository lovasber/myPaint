import React, { useEffect, useState } from 'react'

type prop = {
    toolName: string
}

const HEADER_HEIGHT = 75

const Canvas = ({ toolName }: prop ) => {
    const [elements, setElements] = useState([] as Element[])
    const [action, setAction] = useState('none' as string)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight - HEADER_HEIGHT)
    const [selectedElement, setSelectedElement] = useState(null as unknown as Element)

    const updateUI = () =>{
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.clearRect(0, 0, screenWidth, height)

        //const roughCanvas = rough.canvas(canvas)
/*
        elements.forEach(({roughElement}) => {
            roughCanvas.draw(roughElement as Drawable)
        })
        */
    }
    
    useEffect(() => {
        updateUI()
    }, [elements])

    addEventListener('resize',()=>{
        updateUI()
        setScreenWidth(window.innerWidth)
        setHeight(window.innerHeight - HEADER_HEIGHT)
    })

    const handleMouseDown = (event: React.MouseEvent) => {

    }

    const handleMouseMove = (event: React.MouseEvent) => {
        
    }

    const handleMouseUp = (event: React.MouseEvent) => {

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