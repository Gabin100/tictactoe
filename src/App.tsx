import React, { useState } from 'react';

function App() {
  const [matrix, setMatrix] = useState<(string | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [sign, setSign] = useState<'O' | 'X'>('O');
  const [winner, setWinner] = useState<null | string>(null);

  const checkingWinnerHandler = () => {
    // Check rows for a winner
    for (let i = 0; i < 3; i++) {
      if (
        matrix[i][0] &&
        matrix[i][0] === matrix[i][1] &&
        matrix[i][1] === matrix[i][2]
      ) {
        return matrix[i][0];
      }
    }
    // Check columns for a winner
    for (let i = 0; i < 3; i++) {
      if (
        matrix[0][i] &&
        matrix[0][i] === matrix[1][i] &&
        matrix[1][i] === matrix[2][i]
      ) {
        return matrix[0][i];
      }
    }

    // Check diagonals for a winner
    if (
      matrix[0][0] &&
      matrix[0][0] === matrix[1][1] &&
      matrix[1][1] === matrix[2][2]
    ) {
      return matrix[0][0];
    }

    if (
      matrix[0][2] &&
      matrix[0][2] === matrix[1][1] &&
      matrix[1][1] === matrix[2][0]
    ) {
      return matrix[0][2];
    }

    // If no winner, return null
    return null;
  };

  const matrixHandler = (rowIndex: number, cellIndex: number) => {
    if (matrix[rowIndex][cellIndex] !== null) return;
    const newMatrix = matrix.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === cellIndex ? sign : cell
      )
    );
    setSign((prevSign) => (prevSign === 'O' ? 'X' : 'O'));
    const winnerFound = checkingWinnerHandler();
    if (winnerFound) {
      setWinner(winnerFound);
    } else {
      setMatrix(newMatrix);
    }
  };

  const resetMatrix = () => {
    const newMatrix = matrix.map((row) => row.map((cell) => null));
    setSign('O');
    setWinner(null);
    setMatrix(newMatrix);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Play Tic-Tac-Toe Game</p>
      </header>
      {winner && (
        <div>
          <h1>Winner is {winner}</h1>
        </div>
      )}
      <div>
        <div className='flex flex-col m-5'>
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              {row.map((cell, cellIndex) => (
                <div
                  key={`${rowIndex}${cellIndex}`}
                  className='h-12 w-12 border-2 border-black hover:bg-slate-200 flex justify-center'
                  onClick={() => matrixHandler(rowIndex, cellIndex)}
                >
                  <span className='text-center m-1 text-3xl font-bold'>
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={resetMatrix}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
