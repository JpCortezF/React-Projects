import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameStorage, resetGameStorage } from './logic/Storage/gameStorage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) {
      try {
        return JSON.parse(boardFromStorage);
      } catch (error) {
        console.error('Error parsing board data:', error);
      }
    }
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? (TURNS.X)
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // no actualizamos la posición
    // si ya tiene algo
    if(board[index] || winner){
      return
    } 
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    saveGameStorage({ board: newBoard, turn: newTurn} )
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  return(
    <main className='board'>
      <h1>Ta te ti</h1>
      <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square
               key={index}
               index={index}
               updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
        
        <WinnerModal winner={winner} resetGame={resetGame}/>

    </main>
  )
}

export default App
