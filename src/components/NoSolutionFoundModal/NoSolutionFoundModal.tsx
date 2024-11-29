import React from "react";
import "./NoSolutionFoundModal.css";
import Button from "../Button/Button"; // Assuming Button is in the correct path

// Define the props interface to handle the closeModal function
interface NoSolutionFoundModalProps {
  closeModal: () => void; // Function to handle closing the modal
}

const NoSolutionFoundModal: React.FC<NoSolutionFoundModalProps> = ({
  closeModal,
}) => {
  return (
    <div className="NoSolutionFoundModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button> {/* Close button */}
        </div>
        <div className="modal-title">
          <h1>No Solution Found</h1>
        </div>
        <div className="modal-body">
          <p>
            The current grid does not have any solution. Please change some cell
            values.
          </p>
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

export default NoSolutionFoundModal;
