import React, { useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web"; // import lottie-web and type AnimationItem
import "./GameDetails.css";
import Button from "../Button/Button"; // Assuming Button is already converted to TypeScript

// Define the expected types for the props
interface GameDetailsProps {
  closeModal: () => void;
  handleNewGame: (maxEmptyCells: number) => void;
  movesTaken: number;
  hintsTaken: number;
  startTime: string;
  isPlayerWon: boolean;
  pressedSolve: boolean;
  gameMode: number;
  mediumMaxEmptyCells: number;
  hardMaxEmptyCells: number;
}

const GameDetails: React.FC<GameDetailsProps> = ({
  closeModal,
  movesTaken,
  hintsTaken,
  startTime,
  isPlayerWon,
  pressedSolve,
  gameMode,
  mediumMaxEmptyCells,
  hardMaxEmptyCells,
}) => {
  // Set game mode name based on the passed game mode
  let gameModeName = "Easy";
  if (gameMode === mediumMaxEmptyCells) gameModeName = "Medium";
  else if (gameMode === hardMaxEmptyCells) gameModeName = "Hard";

  // Use effect hook to handle animations and cleanup
  useEffect(() => {
    let animationData: any;

    // Conditionally load different animation based on the game result
    if (isPlayerWon && hintsTaken === 0) {
      animationData = require("../../assets/ChampionWinnerAnimation/ChampionWinnerAnimation.json");
    } else if (isPlayerWon && pressedSolve) {
      animationData = require("../../assets/LoserAnimation/LoserAnimation.json");
    } else if (isPlayerWon) {
      animationData = require("../../assets/GameWonAnimation/GameWonAnimation.json");
    } else {
      animationData = require("../../assets/KeepTryingAnimation/KeepTryingAnimation.json");
    }

    const container = document.getElementById("lottieAnimation");

    const lottieAnimation: AnimationItem = lottie.loadAnimation({
      container: container as Element, // TypeScript expects an Element here
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => lottieAnimation.destroy(); // Cleanup function
  }, [isPlayerWon, hintsTaken, pressedSolve]); // Re-run effect if these values change

  return (
    <div className="GameDetails">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Game Details</h1>
        </div>
        <div className="modal-body">
          <div className="animation-container" id="lottieAnimation"></div>
          {isPlayerWon && <p>You Won!</p>}
          {!isPlayerWon && <p>Keep Playing, you will surely complete it!</p>}
          <p>Game mode: {gameModeName}</p>
          <p>Moves Played: {movesTaken}</p>
          <p>Hints Taken: {hintsTaken}</p>
          <small>Started at: {startTime.split("GMT")[0]}</small>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            buttonStyle="btn--primary--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
