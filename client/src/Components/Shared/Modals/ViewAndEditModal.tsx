import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "Assets/Styles/ComponentsStyle/viewAndEditModal.scss";
import Button from "../Button";
import IconButton from "../IconButton";

type Props = {
  memberID: string;
  cancelBtnText: string;
  cancelBtnAction?: any;
  isOpen: boolean;
  whenClosing: any;
};

const ViewAndEditModal: React.FC<Props> = ({
  memberID,
  cancelBtnText,
  cancelBtnAction,
  isOpen,
  whenClosing,
}) => {
  const [editModeIsOpen, setEditModeIsOpen] = useState<boolean>(false);

  function editViewModalActions() {
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
          <div className="ve-modal-title">View And Update Member</div>
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
              <tr className="table-image">
                <td className="table-title">
                  <img
                    src={
                      "data:image/webp;base64,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"
                    }
                    alt="member-img"
                  />
                </td>
                <td>
                  {" "}
                  <input type="file" id="img" name="img" accept="image/*" />
                </td>
              </tr>
              <tr>
                <td className="table-title">First Name:</td>
                <td>Ege</td>
              </tr>
              <tr>
                <td className="table-title">Last Name: </td>
                <td>Kahraman</td>
              </tr>
              <tr>
                <td className="table-title">E-mail:</td>
                <td>test@gmail.com</td>
              </tr>
              <tr>
                <td className="table-title">Phone:</td>
                <td>05426772225</td>
              </tr>
              <tr>
                <td className="table-title">Birthday:</td>
                <td>20 November 2002</td>
              </tr>
              <tr>
                <td className="table-title">Created Date:</td>
                <td>1 October 2022</td>
              </tr>
              <tr>
                <td className="table-title">Updated Date:</td>
                <td>1 October 2022</td>
              </tr>
              {/*  <tr>
                <td className="table-title">Notes:</td>
                <td className="" >text</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className="ve-modal-buttons">
          <Button
            text={cancelBtnText}
            size={"md"}
            color={"red-border"}
            action={editViewModalActions}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewAndEditModal;
