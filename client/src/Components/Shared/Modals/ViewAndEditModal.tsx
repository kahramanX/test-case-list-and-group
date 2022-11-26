import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "Assets/Styles/ComponentsStyle/viewAndEditModal.scss";
import Button from "../Button";
import IconButton from "../IconButton";
import axios from "axios";
import { IMember } from "Types/types";

type Props = {
  memberID: string | undefined;
  cancelBtnText: string;
  cancelBtnAction?: any;
  isOpen: boolean;
  whenClosing: any;
};

interface Ioptions {
  label: string;
  value: string;
}

const ViewAndEditModal: React.FC<Props> = ({
  memberID,
  cancelBtnText,
  cancelBtnAction,
  isOpen,
  whenClosing,
}) => {
  const [editModeIsOpen, setEditModeIsOpen] = useState<boolean>(false);
  const [singleMemberDataFromApi, setSingleMemberDataFromApi] =
    useState<IMember>();
  function editViewModalActions() {
    whenClosing();
    setEditModeIsOpen(false);
  }

  function getSingleMemberDataFromAPI(memberID: string | undefined) {
    if (memberID) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/member/${memberID}`)
        .then((response: any) => {
          let { data } = response;
          console.log("datassss", data.data);
          setSingleMemberDataFromApi(data.data);
        });
    }
  }

  useEffect(() => {
    getSingleMemberDataFromAPI(memberID);
  }, [memberID]);

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
                    src={singleMemberDataFromApi?.imageBase64}
                    alt="member-img"
                  />
                </td>
                <td>
                  {editModeIsOpen && (
                    <input type="file" id="img" name="img" accept="image/*" />
                  )}
                </td>
              </tr>
              <tr>
                <td className="table-title">First Name:</td>
                {!editModeIsOpen && (
                  <td>{singleMemberDataFromApi?.firstName}</td>
                )}
                {editModeIsOpen && (
                  <td>
                    <input
                      type={"text"}
                      defaultValue={singleMemberDataFromApi?.firstName}
                      className="modal-input"
                    />
                  </td>
                )}
              </tr>
              <tr>
                <td className="table-title">Last Name: </td>
                {!editModeIsOpen && (
                  <td>{singleMemberDataFromApi?.lastName}</td>
                )}

                {editModeIsOpen && (
                  <td>
                    <input
                      type={"text"}
                      defaultValue={singleMemberDataFromApi?.lastName}
                      className="modal-input"
                    />
                  </td>
                )}
              </tr>
              <tr>
                <td className="table-title">E-mail:</td>
                {!editModeIsOpen && <td>{singleMemberDataFromApi?.email}</td>}
                {editModeIsOpen && (
                  <td>
                    <input
                      type={"email"}
                      defaultValue={singleMemberDataFromApi?.email}
                      className="modal-input"
                    />
                  </td>
                )}
              </tr>
              <tr>
                <td className="table-title">Phone:</td>
                {!editModeIsOpen && <td>{singleMemberDataFromApi?.phone}</td>}
                {editModeIsOpen && (
                  <td>
                    <input
                      type={"phone"}
                      defaultValue={singleMemberDataFromApi?.phone}
                      className="modal-input"
                    />
                  </td>
                )}
              </tr>
              <tr>
                <td className="table-title">Birthday:</td>
                {!editModeIsOpen && (
                  <td>{singleMemberDataFromApi?.birthday}</td>
                )}
                {editModeIsOpen && (
                  <td>
                    <input
                      type={"date"}
                      defaultValue={singleMemberDataFromApi?.birthday}
                      className="modal-input"
                    />
                  </td>
                )}
              </tr>
              {!editModeIsOpen && (
                <>
                  <tr>
                    <td className="table-title">Added Groups:</td>
                    <td>Hello, xyz, Winners, Friends</td>
                  </tr>
                  <tr>
                    <td className="table-title">Created Date:</td>
                    <td>{singleMemberDataFromApi?.createdDate}</td>
                  </tr>
                  <tr>
                    <td className="table-title">Updated Date:</td>
                    <td>{singleMemberDataFromApi?.updatedDate}</td>
                  </tr>
                </>
              )}

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
