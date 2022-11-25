import React, { useState } from "react";
import Modal from "react-modal";
import "Assets/Styles/ComponentsStyle/viewAndEditModal.scss";
import Button from "../Button";
import IconButton from "../IconButton";

type Props = {
  groupID: string;
  cancelBtnText: string;
  cancelBtnAction?: any;
  isOpen: boolean;
  whenClosing: any;
};

const ViewAndEditGroupModal: React.FC<Props> = ({
  groupID,
  cancelBtnText,
  cancelBtnAction,
  isOpen,
  whenClosing,
}) => {
  const [editModeIsOpen, setEditModeIsOpen] = useState<boolean>(false);

  function editViewGroupModalActions() {
    whenClosing();
    setEditModeIsOpen(false);
  }

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        cancelBtnAction();
        setEditModeIsOpen(false);
      }}
      style={customStyles}
      contentLabel="View And Edit Modal"
    >
      <div className="viewedit-modal-text-container">
        <div className="ve-modal-header">
          <div className="ve-modal-title">View And Update Group</div>
          <div className="ve-modal-edit-btn">
            {!editModeIsOpen && (
              <IconButton
                iconName={"edit"}
                color={"green"}
                action={() => setEditModeIsOpen(true)}
              />
            )}
            {editModeIsOpen && (
              <div className="edit-btn-actions">
                <IconButton
                  iconName={"close"}
                  color={"red"}
                  action={() => setEditModeIsOpen(false)}
                />
                <IconButton
                  iconName={"done"}
                  color={"green"}
                  action={() => setEditModeIsOpen(false)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="ve-modal-table-container">
          <table>
            <tbody>
              <tr>
                <td className="table-title">Group Name:</td>
                {!editModeIsOpen && <td>Group 1</td>}
                {editModeIsOpen && (
                  <td>
                    <input
                      type={"text"}
                      value={"Group 1"}
                      className="modal-input"
                    />
                  </td>
                )}
              </tr>
              {!editModeIsOpen && (
                <>
                  <tr>
                    <td className="table-title">Created Date:</td>
                    <td>1 October 2022</td>
                  </tr>
                  <tr>
                    <td className="table-title">Updated Date:</td>
                    <td>1 October 2022</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="ve-modal-buttons">
          <Button
            text={cancelBtnText}
            size={"md"}
            color={"red-border"}
            action={editViewGroupModalActions}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewAndEditGroupModal;
