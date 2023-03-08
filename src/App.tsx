import { useState } from 'react'
import Canvas from './components/Canvas'
import  Header  from './components/Header'

function App() {
  const [toolName, setToolName] = useState('line')
  const [cursor, setCursor] = useState('default')

  return (
    <div className="App">
       
        <Canvas toolName={toolName} cursor={cursor}/>
        <Header setToolName={setToolName} setCursor={setCursor}/>
    </div>
  )
}

export default App
