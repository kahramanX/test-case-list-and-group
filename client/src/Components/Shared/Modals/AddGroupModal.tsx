import React from "react";
import Modal from "react-modal";
import Button from "../Button";

type Props = {
  isOpen: boolean;
  confirmBtnText: string;
  cancelBtnText: string;
  cancelBtnAction: any;
  whenClosing: any;
};

interface Ioptions {
  label: string;
  value: string;
}

const AddGroupModal: React.FC<Props> = ({
  isOpen,
  confirmBtnText,
  cancelBtnAction,
  cancelBtnText,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "700px",
    },
  };

  const options: Ioptions[] = [
    {
      label: "label1",
      value: "label1",
    },
    {
      label: "label1",
      value: "label2",
    },
    {
      label: "label3",
      value: "label3",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        cancelBtnAction();
      }}
      style={customStyles}
      contentLabel="View And Edit Modal"
    >
      <div className="viewedit-modal-text-container">
        <div className="ve-modal-header">
          <div className="ve-modal-title">Add Group</div>
          <div className="ve-modal-edit-btn"></div>
        </div>
        <div className="ve-modal-table-container">
          <table>
            <tbody>
              <tr>
                <td className="table-title">Group Name:</td>

                <td>
                  <input
                    type={"text"}
                    defaultValue={"Group 2"}
                    className="modal-input"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ve-modal-buttons">
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
            action={() => console.log("kaydedildi")}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddGroupModal;
