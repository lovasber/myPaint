import { useState } from 'react'
import Canvas from './components/Canvas'
import  Header  from './components/Header'

function App() {
  const [shapeName, setShapeName] = useState('line')

  return (
    <div className="App">
       
        <Canvas shapeName={shapeName}/>
        <Header setShapeName={setShapeName}/>
    </div>
  )
}

export default App
