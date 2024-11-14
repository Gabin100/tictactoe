import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import ImageDetection from './facedetection';

function App() {
  const ToCaptureRef = useRef<HTMLInputElement>(null); // ref
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

  const captureScreenshot = () => {
    if (ToCaptureRef.current === null) {
      return null;
    }

    let canvasPromise = html2canvas(ToCaptureRef.current, {
      useCORS: true, // in case you have images stored in your application
    });
    canvasPromise.then((canvas) => {
      var dataURL = canvas.toDataURL('image/png');
      console.log(dataURL);

      // Create a link element for download
      var a = document.createElement('a');
      a.href = dataURL;
      a.download = 'screenshot.png'; // Set a filename for download

      // Append the link to the document body
      document.body.appendChild(a);

      // Trigger the download by simulating a click on the link
      a.click();

      // Remove the link from the document after the download is triggered
      document.body.removeChild(a);
    });
  };

  return (
    <div className='App' ref={ToCaptureRef}>
      <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <header className='App-header'>
          <p>Play Tic-Tac-Toe Game</p>
        </header>
        {winner && (
          <div>
            <h1>Winner is {winner}</h1>
          </div>
        )}
        <div className='flex flex-col m-5'>
          <div className='grid grid-rows-3 grid-flow-col gap-4'>
            <div className='row-span-3'>
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

          <div className='row-span-1 col-span-2'>
            <img
              alt='temp'
              style={{ width: '500px' }}
              src='https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => captureScreenshot()}
            >
              ScreenShot
            </button>
          </div>
        </div>
      </div>
      <div className='rounded overflow-hidden shadow-lg'>
        <ImageDetection />
      </div>
    </div>
  );
}

export default App;
