import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";

// Import components
import {
  Grid,
  ChoiceBoard,
  Button,
  InformationModal,
  NoSolutionFoundModal,
  GameDetails,
  DifficultySelectionModal,
} from "../../components/index";

// Import utility functions
import {
  animateElement,
  arrayDeepCopy,
  checkBoard,
  checkPlayerWon,
  createSudokuGrid,
  solveSudoku,
} from "../../utility";
import useLocalStorage from "../../hooks/useLocalStorage";
import getHint from "../../utility/getHint";

// Import CSS for the Game
import "./Game.css";

// Difficulty constants
const easyMaxEmptyCells = 30;
const mediumMaxEmptyCells = 40;
const hardMaxEmptyCells = 50;

// Define the Cell interface
interface Cell {
  row: number;
  column: number;
  value: number;
  isValid: boolean;
  isModifiable: boolean;
  isHinted: boolean;
}

interface HintResponse {
  board: Cell[][] | null;
  solvedStatus: boolean;
}

const Game: React.FC = () => {
  // Initialize grid and startingGrid as Cell[][] and fallback to empty array if null
  const [grid, setGrid] = useLocalStorage("currentGrid", [] as Cell[][]);
  const [startingGrid, setStartingGrid] = useLocalStorage(
    "startingGrid",
    [] as Cell[][] // Empty array for starting grid
  );
  const [clickValue, setClickValue] = useLocalStorage("clickValue", 1);

  // Game Score logic
  const [gameMode, setGameMode] = useLocalStorage(
    "gameMode",
    mediumMaxEmptyCells
  );
  const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
  const [hintsTaken, setHintsTaken] = useLocalStorage("hintsTaken", 0);
  const [isPlayerWon, setIsPlayerWon] = useLocalStorage("playerWon", false);
  const [pressedSolve, setPressedSolve] = useLocalStorage(
    "pressedSolve",
    false
  );
  const [startTime, setStartTime] = useLocalStorage("startTime", () =>
    Date().toLocaleString()
  );

  // Modal states
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [showNoSolutionFoundModal, setShowNoSolutionFoundModal] =
    useState(false);
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [showDifficultySelectionModal, setShowDifficultySelectionModal] =
    useState(false);

  // Validation function to check row, column, and 3x3 subgrid
  const isValidNode = (
    row: number,
    col: number,
    value: number,
    board: Cell[][]
  ) => {
    // Check horizontal (row)
    for (let i = 0; i < 9; i++) {
      if (board[row][i].value === value) return false;
    }

    // Check vertical (column)
    for (let i = 0; i < 9; i++) {
      if (board[i][col].value === value) return false;
    }

    // Check 3x3 subgrid
    let x0 = Math.floor(row / 3) * 3;
    let y0 = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[x0 + i][y0 + j].value === value) return false;
      }
    }

    return true; // Valid move if no conflicts
  };

  const handleSolve = () => {
    if (!grid) return;

    let solvedBoard = arrayDeepCopy(grid);
    let solvedStatus = solveSudoku(solvedBoard);

    if (solvedStatus === false) {
      setShowNoSolutionFoundModal(true);
      return;
    }

    let newHints = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          newHints++;
          solvedBoard[i][j].isHinted = true;
          solvedBoard[i][j].isModifiable = false;
        }
      }
    }

    setHintsTaken((hints) => hints + newHints);
    setIsPlayerWon(true);
    setShowGameDetails(true);
    setPressedSolve(true);
    setGrid(solvedBoard);
  };

  const handleHint = () => {
    if (isPlayerWon || !grid) return;

    let hintResponse: HintResponse = getHint(grid);

    if (!hintResponse.board) {
      setShowNoSolutionFoundModal(true);
      return;
    }

    setGrid(hintResponse.board); // This should now be valid Cell[][] or an empty grid
    setHintsTaken((hints) => hints + 1);

    let playerWon = checkPlayerWon(hintResponse.board);
    if (playerWon) {
      setIsPlayerWon(true);
      setShowGameDetails(true);
    }
  };

  const handleNewGame = (maxEmptyCellsCount: number) => {
    let newSudokuGrid = createSudokuGrid(maxEmptyCellsCount);
    setStartingGrid(arrayDeepCopy(newSudokuGrid));
    setGrid(arrayDeepCopy(newSudokuGrid));

    setGameMode(maxEmptyCellsCount);
    setMovesTaken(0);
    setHintsTaken(0);
    setIsPlayerWon(false);
    setPressedSolve(false);
    setStartTime(() => Date().toLocaleString());

    setShowDifficultySelectionModal(false);
  };

  const handleClearBoard = () => {
    setIsPlayerWon(false);
    setGrid(arrayDeepCopy(startingGrid));
  };

  const handleCellClick = (
    row: number,
    column: number,
    isModifiable: boolean
  ) => {
    if (!grid || !isModifiable) {
      animateElement(".grid-table", "headShake");
      return;
    }

    if (clickValue !== 0) setMovesTaken((moves) => moves + 1);

    // Validate the move before updating the grid
    let newGrid = arrayDeepCopy(grid);
    if (isValidNode(row, column, clickValue, newGrid)) {
      newGrid[row][column].value = clickValue;
      checkBoard(newGrid);

      let playerWon = checkPlayerWon(newGrid);
      if (playerWon) {
        setIsPlayerWon(true);
        setShowGameDetails(true);
      }

      setGrid(newGrid);
    } else {
      animateElement(".grid-table", "headShake"); // If move is invalid, animate the shake
    }
  };

  // Initialize grid if it's null or empty
  useEffect(() => {
    if (!grid || grid.length === 0) handleNewGame(gameMode);
  }, [grid, gameMode]);

  return (
    <div className="Game">
      <div className="show-game-detail-container-button">
        <button onClick={() => setShowGameDetails((show) => !show)}>
          <AiOutlineMenu />
        </button>
      </div>

      <h1
        onClick={() => setShowInformationModal((show) => !show)}
        className="main-title"
      >
        AbdelKarim Metlej Sudoku !
      </h1>
      {showInformationModal && (
        <InformationModal closeModal={() => setShowInformationModal(false)} />
      )}
      {showNoSolutionFoundModal && (
        <NoSolutionFoundModal
          closeModal={() => setShowNoSolutionFoundModal(false)}
        />
      )}
      {showDifficultySelectionModal && (
        <DifficultySelectionModal
          closeModal={() => setShowDifficultySelectionModal(false)}
          handleNewGame={handleNewGame}
          easyMaxEmptyCells={easyMaxEmptyCells}
          mediumMaxEmptyCells={mediumMaxEmptyCells}
          hardMaxEmptyCells={hardMaxEmptyCells}
        />
      )}
      {showGameDetails && (
        <GameDetails
          closeModal={() => setShowGameDetails(false)}
          movesTaken={movesTaken}
          hintsTaken={hintsTaken}
          startTime={startTime}
          isPlayerWon={isPlayerWon}
          pressedSolve={pressedSolve}
          gameMode={gameMode}
          mediumMaxEmptyCells={mediumMaxEmptyCells}
          hardMaxEmptyCells={hardMaxEmptyCells}
          handleNewGame={handleNewGame}
        />
      )}

      <Grid handleCellClick={handleCellClick} grid={grid} />
      <ChoiceBoard setClickValue={setClickValue} selected={clickValue} />

      <div className="action-container">
        <Button
          onClick={handleClearBoard}
          buttonStyle="btn--primary--solid"
          text="Clear"
        />
        <Button
          onClick={handleSolve}
          buttonStyle="btn--success--solid"
          text="Solve"
        />
        <Button
          onClick={handleHint}
          buttonStyle="btn--warning--solid"
          text="Hint"
        />
        <Button
          onClick={() => setShowDifficultySelectionModal((show) => !show)}
          buttonStyle="btn--danger--solid"
          text="New Game"
        />
      </div>
    </div>
  );
};

export default Game;
