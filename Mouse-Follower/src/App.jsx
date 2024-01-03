import { useEffect, useState } from "react"

const MouseFollower = () => {
  const [enable, setEnable] = useState(false)

  const [position, setPosition] = useState(() => {
    try {
      const cursorFromStorage = window.localStorage.getItem("cursor");
      return cursorFromStorage ? JSON.parse(cursorFromStorage) : { x: 0, y: 0 };
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return { x: 0, y: 0 };
    }
  });

// pointer move
  useEffect(() =>{
    const handleMove = (event) => {
      const { clientX, clientY} = event
      console.log('handleMove', { clientX, clientY})
      setPosition({ x: clientX, y: clientY });
    }

    if(enable){
      window.addEventListener('pointermove', handleMove)

      return () => {
        window.removeEventListener('pointermove', handleMove);
        window.localStorage.setItem('cursor', JSON.stringify(position))
      };
    }
  }, [enable, position])

// change body className
  useEffect(() =>{
    document.body.classList.toggle('no-cursor', enable)

    return () =>{
      document.body.classList.remove('no-cursor')
    }
  },[enable])
  return(
    <>
        <div style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #747bff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        />
        <button onClick={() => setEnable(!enable)}>
          {enable ? 'Desactivar' : 'Activar'} seguir puntero
        </button>
    </>
  )
}

function App() {
  return (
      <main>
        <MouseFollower/>
      </main>
  )
   
}

export default App
