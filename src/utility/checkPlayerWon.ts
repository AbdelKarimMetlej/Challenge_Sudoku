interface Cell {
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

const checkPlayerWon = (board: Cell[][]): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // If any cell is empty (value === 0) or invalid, player has not won
      if (board[i][j].value === 0 || board[i][j].isValid === false) {
        return false;
      }
    }
  }
  return true;
};

export default checkPlayerWon;
