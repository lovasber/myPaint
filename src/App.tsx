import { useState } from 'react'
import Canvas from './components/Canvas'
import  Header  from './components/Header'

function App() {
  const [toolName, setToolName] = useState('line')

  return (
    <div className="App">
       
        <Canvas toolName={toolName}/>
        <Header setToolName={setToolName}/>
    </div>
  )
}

export default App
