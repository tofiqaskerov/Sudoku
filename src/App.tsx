import { useState } from 'react';
import './App.css'

type TPoint = {
  x:number,
  y:number
}
function App() {

  const [points, setPoint] = useState<TPoint[]>([])
  const [popped, setPopped] = useState<TPoint[]>([])

  function handleUndo(){
    const newPoints = [...points]
    const poppedPoints = newPoints.pop()
    if(!poppedPoints) return
    setPopped([...popped, poppedPoints])
    setPoint(newPoints)
  }

  function handleRedo(){
    const newPopped = [...popped]
    const lastPopped = newPopped.pop()
    if(!lastPopped) return
    setPopped(newPopped)
    setPoint([...points, lastPopped])
    
  }
  
  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>){
    const {pageX, pageY} = e
    setPoint([
      ...points,
       {x:pageX, y:pageY}
      ])
    
  }
  return <>
  <button  disabled={points.length === 0} className="undo" onClick={handleUndo}>Undo</button>
  <button  disabled={popped.length === 0 } className="redo" onClick={handleRedo}>Redo</button>
  <div className='App'
    onClick={handlePlaceCircle}
  >
    {
      points.map((item, index) => <div key={index} className='point' style={{
        left: item.x - 5+ "px",
        top: item.y - 5+"px"
      }}
      >
        
      </div>)
    }
  </div>
  </>
}

export default App
