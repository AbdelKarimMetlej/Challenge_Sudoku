import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem, RendererType } from "lottie-web";
import easyDifficultyAnimationData from "../../assets/DifficultyAnimations/EasyDifficultyAnimation/EasyDifficultyAnimation.json";
import mediumDifficultyAnimationData from "../../assets/DifficultyAnimations/MediumDifficultyAnimation/MediumDifficultyAnimation.json";
import hardDifficultyAnimationData from "../../assets/DifficultyAnimations/HardDifficultyAnimation/HardDifficultyAnimation.json";
import "./DifficultySelectionModal.css";
import Button from "../Button/Button";

// Define the expected prop types
interface DifficultySelectionModalProps {
  closeModal: () => void;
  handleNewGame: (maxEmptyCells: number) => void;
  easyMaxEmptyCells: number;
  mediumMaxEmptyCells: number;
  hardMaxEmptyCells: number;
}

const DifficultySelectionModal: React.FC<DifficultySelectionModalProps> = ({
  closeModal,
  handleNewGame,
  easyMaxEmptyCells,
  mediumMaxEmptyCells,
  hardMaxEmptyCells,
}) => {
  const bodyContainer = useRef<HTMLDivElement | null>(null); // Type useRef correctly

  useEffect(() => {
    const defaultOptions = {
      renderer: "svg" as RendererType, // Correctly typed renderer
      loop: true,
      autoplay: true,
    };

    // Easy Difficulty Animation
    const easyDifficultyAnimationContainer = document.getElementById(
      "easyDifficultyAnimation"
    ) as HTMLElement;
    const easyDifficultyAnimation: AnimationItem = lottie.loadAnimation({
      container: easyDifficultyAnimationContainer,
      animationData: easyDifficultyAnimationData as any, // Type assertion here
      ...defaultOptions,
    });

    // Medium Difficulty Animation
    const mediumDifficultyAnimationContainer = document.getElementById(
      "mediumDifficultyAnimation"
    ) as HTMLElement;
    const mediumDifficultyAnimation: AnimationItem = lottie.loadAnimation({
      container: mediumDifficultyAnimationContainer,
      animationData: mediumDifficultyAnimationData as any, // Type assertion here
      ...defaultOptions,
    });

    // Hard Difficulty Animation
    const hardDifficultyAnimationContainer = document.getElementById(
      "hardDifficultyAnimation"
    ) as HTMLElement;
    const hardDifficultyAnimation: AnimationItem = lottie.loadAnimation({
      container: hardDifficultyAnimationContainer,
      animationData: hardDifficultyAnimationData as any, // Type assertion here
      ...defaultOptions,
    });

    // Make the body container visible
    if (bodyContainer.current) {
      bodyContainer.current.style.visibility = "visible";
    }

    return () => {
      // Cleanup: Destroy animations when the component is unmounted
      easyDifficultyAnimation.destroy();
      mediumDifficultyAnimation.destroy();
      hardDifficultyAnimation.destroy();
    };
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <div className="DifficultySelectionModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>Difficulty Mode</h1>
        </div>
        <div className="difficulty-modal-body" ref={bodyContainer}>
          <div className="difficulty-selection-container">
            <div
              className="difficulty easy"
              onClick={() => handleNewGame(easyMaxEmptyCells)}
            >
              <div
                id="easyDifficultyAnimation"
                className="animation-container-difficulty"
              ></div>
              <p>Easy</p>
            </div>

            <div
              className="difficulty medium"
              onClick={() => handleNewGame(mediumMaxEmptyCells)}
            >
              <div
                id="mediumDifficultyAnimation"
                className="animation-container-difficulty"
              ></div>
              <p>Medium</p>
            </div>

            <div
              className="difficulty hard"
              onClick={() => handleNewGame(hardMaxEmptyCells)}
            >
              <div
                id="hardDifficultyAnimation"
                className="animation-container-difficulty"
              ></div>
              <p>Hard</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            buttonStyle="btn--primary--solid"
            text="Back"
          />
        </div>
      </div>
    </div>
  );
};

export default DifficultySelectionModal;
