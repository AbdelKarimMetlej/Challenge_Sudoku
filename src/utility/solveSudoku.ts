// Define the Cell interface
interface Cell {
  row: number;
  column: number;
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

// Function to check if placing a value in the given cell is valid
const isValidNode = (
  row: number,
  col: number,
  value: number,
  board: Cell[][]
): boolean => {
  const cellValue = value;

  // Check horizontal
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === cellValue) return false;
  }

  // Check vertical
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === cellValue) return false;
  }

  // Check 3x3 box (sub-grid)
  let x0 = Math.floor(row / 3) * 3;
  let y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j].value === cellValue) return false;
    }
  }

  return true;
};

// Function to solve the Sudoku using backtracking
const solveSudoku = (board: Cell[][]): boolean => {
  // Loop through all cells to find an empty one
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        // Try numbers 1-9
        for (let k = 1; k <= 9; k++) {
          // Check if the number is valid for the current cell
          if (isValidNode(i, j, k, board)) {
            // If valid, place the number
            board[i][j].value = k;

            // Recursively try to solve the rest of the board
            if (solveSudoku(board)) return true;

            // If solving failed, reset the current cell (backtrack)
            board[i][j].value = 0;
          }
        }
        return false; // No valid number can be placed
      }
    }
  }
  return true; // Puzzle solved
};

export default solveSudoku;
