import { arrayDeepCopy, solveSudoku } from "./index";

// Define the Cell interface to make the board structure type-safe
interface Cell {
  row: number;
  column: number;
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

// Define the return type for the getHint function
interface HintResponse {
  board: Cell[][] | null;
  solvedStatus: boolean;
}

const getHint = (board: Cell[][]): HintResponse => {
  // Copying the board and solving it without referencing the actual grid
  let solvedBoard = arrayDeepCopy(board);
  let solvedStatus = solveSudoku(solvedBoard);

  // If no solution was found
  if (solvedStatus === false) {
    return { board: null, solvedStatus: false };
  }

  // If solution was found
  // Finding all the empty nodes from the original given board
  let emptyNodePositionList: [number, number][] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        emptyNodePositionList.push([i, j]);
      }
    }
  }

  // Selecting a random element from the empty nodes list
  const randomIndex = Math.floor(Math.random() * emptyNodePositionList.length);
  let row = emptyNodePositionList[randomIndex][0];
  let col = emptyNodePositionList[randomIndex][1];

  // Creating new board from the data
  // Making new node and replacing the empty value with the hint
  let result = arrayDeepCopy(board);
  result[row][col].value = solvedBoard[row][col].value;
  result[row][col].isHinted = true;
  result[row][col].isModifiable = false;

  return { board: result, solvedStatus: true };
};

export default getHint;
