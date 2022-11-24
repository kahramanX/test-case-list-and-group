import React from "react";
import Modal from "react-modal";
import "Assets/Styles/ComponentsStyle/questionModal.scss";

type Props = {};

const ViewAndEditModal: React.FC = (props: Props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={false}
      onAfterOpen={() => ""}
      onRequestClose={() => ""}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
};

export default ViewAndEditModal;
