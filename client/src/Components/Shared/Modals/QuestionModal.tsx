import React from "react";
import Modal from "react-modal";
import Button from "../Button";
import "Assets/Styles/ComponentsStyle/questionModal.scss";
type Props = {
  modalTitle: string;
  modalDesc: string;
  confirmBtnText: string;
  confirmBtnAction?: any;
  cancelBtnText: string;
  cancelBtnAction?: any;
  isOpen: boolean;
  whenClosing: any;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

const QuestionModal: React.FC<Props> = ({
  modalTitle,
  modalDesc,
  confirmBtnText,
  confirmBtnAction,
  cancelBtnText,
  cancelBtnAction,
  isOpen,
  whenClosing,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => whenClosing()}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="question-modal-text-container">
        <div className="q-modal-title">{modalTitle}</div>
        <div className="q-modal-description">{modalDesc}</div>
        <div className="q-modal-buttons">
          <Button
            text={cancelBtnText}
            size={"md"}
            color={"red-border"}
            action={() => cancelBtnAction()}
          />
          <Button
            text={confirmBtnText}
            size={"md"}
            color={"blue"}
            action={() => confirmBtnAction()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
