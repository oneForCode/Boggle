import './App.css';
import { useEffect, useState } from 'react';
import dictionary from './dictionary.txt';

const SIZE = 5;

window.dictionary = dictionary;

const distributions = [
  'aaafrs',
  'aaeeee',
  'aafirs',
  'adennn',
  'aeeeem',

  'aeegmu',
  'aegmnn',
  'afirsy',
  'bjkqxz',
  'ccenst',

  'ceiilt',
  'ceilpt',
  'ceipst',
  'ddhnot',
  'dhhlor',

  'dhlnor',
  'dhlnor',
  'eiiitt',
  'emottt',
  'ensssu',

  'fiprsy',
  'gorrvw',
  'iprrry',
  'nootuw',
  'ooottu',
];


let cubesAvailable;



function App() {

  const getLetter = (row, col) => {

    if (!cubesAvailable || !cubesAvailable.length) {
      console.log('>>> cubesAvailable reset!!  <<<<<');
      cubesAvailable = [...distributions];
    }

    const nextCubeIndex = Math.floor(Math.random() * (cubesAvailable.length));
    // console.log('>> nextCubeIndex = ', nextCubeIndex);

    const nextCube = cubesAvailable[nextCubeIndex];
    // console.log('>> nextCube = ', nextCube);


    if (!nextCube) debugger;

    const nextLetter = nextCube[Math.floor(Math.random() * nextCube.length)];

    // console.log('>> nextLetter = ', nextLetter);

    // console.log('>> before cubesAvailable = ', cubesAvailable);
    // remove cube from list of available
    cubesAvailable.splice(nextCubeIndex, 1);

    // console.log('>> after cubesAvailable = ', cubesAvailable);


    return nextLetter;
  }


  const createAndPopulateBoard = () => {

    const board = Array(SIZE).fill('').map(x => Array(SIZE).fill(''));

    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        board[row][col] = getLetter(row, col);

      }
    }

    // console.log('>>> board = ', board);

    return board;
  };

  const [board, setBoard] = useState();
  const [selectedCells, setSelectedCells] = useState([])

  const makeNewGame = () => {
    cubesAvailable = [...distributions];
    setBoard(createAndPopulateBoard());
  }

  useEffect(() => {

    makeNewGame();
    debugger;
  }, []);

  const isAdjacent = id => {

    const lastValidCell = selectedCells.slice(-1)[0];

    if (!lastValidCell) return true;

    const [c0, row0, col0] = lastValidCell?.split('_') || [];
    const [c1, row1, col1] = id.split('_');

    if (Math.abs(row0 - row1) <= 1 && Math.abs(col0 - col1) <= 1) {
      return true;
    }

    return false;
  }

  const notADup = id => {
    return true;
  }

  const isValidClick = id => {

    return isAdjacent(id) && notADup(id);

  }

  const submitWord = () => {
    console.log('>>> submitting word: ', reconstructTheWord());

  }



  const hanldClick = e => {
    const id = e.currentTarget.id;

    if (!isValidClick(id)) return;

    const newAr = [...selectedCells, id];

    setSelectedCells(newAr);
  }

  const reconstructTheWord = () => {

    const res = selectedCells.map(el => {

      const [c, row, col] = el.split('_');
      return board[row][col];
    }).join('');


    return res;
  }

  return (
    <div className="App">
      <header className="App-header">
        Boggle
        <table>
          <tbody>

            {board?.map((el, row) => {

              return (<tr key={`${row}`}>
                {el?.map((x, col) => {

                  const id = `c_${row}_${col}`;
                  const selected = selectedCells.indexOf(id) !== -1 ? 'selected' : '';

                  return (
                    <td className={selected} id={id} key={id} onClick={hanldClick}>
                      {board[row][col]}
                      {/* {row}, {col} */}
                    </td>)
                })}
              </tr>)
            })}

          </tbody>

        </table>
        <h3>{reconstructTheWord()}</h3>
        <button onClick={submitWord}>Submit</button>

      </header>
    </div>
  );
}

export default App;
