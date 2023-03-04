import { useState } from 'react'
import Canvas from './components/Canvas'
import  Header  from './components/Header'

function App() {
/* <Header/> */
  return (
    <div className="App">
        <Canvas canvasHeight={window.innerHeight} canvasWidth={window.innerWidth}/>
    </div>
  )
}

export default App
