// Define the Cell interface
interface Cell {
  row: number;
  column: number;
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

// Check if the value is valid for the given row, column
const isValidNode = (
  row: number,
  col: number,
  value: number,
  board: Cell[][]
): boolean => {
  // Check horizontal
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === value) return false; // Row check
    if (board[i][col].value === value) return false; // Column check
  }

  // Check 3x3 box
  const x0 = Math.floor(row / 3) * 3;
  const y0 = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[x0 + i][y0 + j].value === value) return false; // Box check
    }
  }

  return true;
};

// Count all possible Sudoku solutions for the given board
const countSudokuSolution = (board: Cell[][]): number => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        let count = 0;
        for (let k = 1; k <= 9; k++) {
          if (isValidNode(i, j, k, board)) {
            board[i][j].value = k;
            count += countSudokuSolution(board);
            board[i][j].value = 0;
          }
        }
        return count;
      }
    }
  }
  return 1;
};

// Solve the Sudoku board by filling in missing cells
const solveRandomSudoku = (board: number[][]): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          const num = Math.floor(Math.random() * 9) + 1;
          if (isValidNode(i, j, num, board as unknown as Cell[][])) {
            board[i][j] = num;
            if (solveRandomSudoku(board)) return true;
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Generate the Sudoku grid with a specified number of empty cells
const getSudokuGrid = (maxEmptyCellsCount: number): number[][] => {
  const sudokuGrid: number[][] = Array.from({ length: 9 }, () =>
    Array(9).fill(0)
  );

  solveRandomSudoku(sudokuGrid);

  let emptyCells = 0;
  const shuffledCells = Array.from({ length: 81 }, (_, index) => index).sort(
    () => Math.random() - 0.5
  );

  for (const cellIndex of shuffledCells) {
    if (emptyCells >= maxEmptyCellsCount) break;

    const row = Math.floor(cellIndex / 9);
    const col = cellIndex % 9;

    const value = sudokuGrid[row][col];
    sudokuGrid[row][col] = 0;

    const count = countSudokuSolution(
      sudokuGrid.map((row) =>
        row.map((value) => ({
          row: 0,
          column: 0,
          value,
          isValid: true,
          isModifiable: false,
          isHinted: false,
        }))
      )
    );

    if (count === 1) emptyCells++;
    else sudokuGrid[row][col] = value;
  }

  return sudokuGrid;
};

// Get the node object for a specific cell in the Sudoku grid
const getNode = (
  row: number,
  column: number,
  value: number,
  isModifiable: boolean
): Cell => {
  return {
    row,
    column,
    value,
    isValid: true,
    isModifiable,
    isHinted: false,
  };
};

// Create the Sudoku grid with the specified difficulty level
const createSudokuGrid = (maxEmptyCellsCount: number): Cell[][] => {
  const numberGrid = getSudokuGrid(maxEmptyCellsCount);
  return numberGrid.map((row, rowIndex) =>
    row.map((value, colIndex) =>
      getNode(rowIndex, colIndex, value, value === 0)
    )
  );
};

export default createSudokuGrid;
