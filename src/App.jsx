import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class = " w-[100vw] h-[100vh] bg-green-600">
        <p onClick={()=> setCount((count)=> {return [parseInt(count)+1]})}>Click me to increase count: {count}</p>
      </div>
    </>
  )
}

export default App
