interface Cell {
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

const getWrongLines = (
  board: Cell[][],
  type: "horizontal" | "vertical"
): Set<number> => {
  let wrongLines = new Set<number>();

  for (let i = 0; i < 9; i++) {
    let dict: { [key: number]: number } = {}; // To store the counts of values

    for (let j = 0; j < 9; j++) {
      let key: number;
      if (type === "horizontal") key = board[i][j].value;
      else key = board[j][i].value;

      if (key === 0) continue; // Skip empty cells

      if (Object.hasOwnProperty.call(dict, key)) {
        dict[key] += 1;
        if (dict[key] > 1) {
          wrongLines.add(i); // Add the row/column index as invalid
          break;
        }
      } else {
        dict[key] = 1;
      }
    }
  }
  return wrongLines;
};

const isBoxValid = (board: Cell[][], x0: number, y0: number): boolean => {
  let dict: { [key: number]: number } = {};

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let key = board[x0 + i][y0 + j].value;
      if (key === 0) continue; // Skip empty cells

      if (Object.hasOwnProperty.call(dict, key)) {
        dict[key] += 1;
        if (dict[key] > 1) {
          return false; // Duplicate value found in the box
        }
      } else {
        dict[key] = 1;
      }
    }
  }
  return true;
};

const getWrongBoxes = (board: Cell[][]): Set<number> => {
  let wrongBoxes = new Set<number>();

  // Define the box positions as an indexable object
  const boxValues: { [key: number]: { x: number; y: number } } = {
    0: { x: 0, y: 0 },
    1: { x: 0, y: 3 },
    2: { x: 0, y: 6 },
    3: { x: 3, y: 0 },
    4: { x: 3, y: 3 },
    5: { x: 3, y: 6 },
    6: { x: 6, y: 0 },
    7: { x: 6, y: 3 },
    8: { x: 6, y: 6 },
  };

  for (let box = 0; box < 9; box++) {
    let { x, y } = boxValues[box];
    if (!isBoxValid(board, x, y)) {
      wrongBoxes.add(box);
    }
  }

  return wrongBoxes;
};

const getBoxNumber = (x: number, y: number): number => {
  let x0 = Math.floor(x / 3);
  let y0 = Math.floor(y / 3);
  return [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ][x0][y0];
};

const checkBoard = (board: Cell[][]): void => {
  let wrongHorizontal = getWrongLines(board, "horizontal");
  let wrongVertical = getWrongLines(board, "vertical");
  let wrongBoxes = getWrongBoxes(board);

  console.log(getBoxNumber(1, 5)); // Debugging output
  console.log(wrongBoxes); // Debugging output

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (
        wrongHorizontal.has(i) ||
        wrongVertical.has(j) ||
        wrongBoxes.has(getBoxNumber(i, j))
      ) {
        board[i][j].isValid = false;
      } else {
        board[i][j].isValid = true;
      }
    }
  }
};

export default checkBoard;
