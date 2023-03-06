import { useState } from 'react'
import Paint from './components/Canvas'
import Canvas from './components/Canvas'
import  Header  from './components/Header'

function App() {
  const [toolName, setToolName] = useState('line')

  return (
    <div className="App">
       
        <Paint />
        <Header setToolName={setToolName}/>
    </div>
  )
}

export default App
