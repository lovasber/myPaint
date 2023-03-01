import { useState } from 'react'
import  Header  from './components/Header'

function App() {
  const canvasStyle = {
    width: window.innerWidth,
    height: window.innerHeight-84,
    backgroundColor: '#424242',
  }

  return (
    <div className="App">
        <Header/>
        <canvas style={canvasStyle}></canvas>
    </div>
  )
}

export default App
