import React from "react";
import "./InformationModal.css";

// Import Button component (adjust path as needed)
import Button from "./../Button/Button";

// Define the type for the props
interface InformationModalProps {
  closeModal: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({ closeModal }) => {
  return (
    <div className="InformationModal">
      <div className="modal-container">
        <div className="modal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title">
          <h1>AbdelKarim Metlej</h1>
        </div>
        <div className="modal-footer">
          <Button
            onClick={closeModal}
            buttonStyle="btn--success--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
