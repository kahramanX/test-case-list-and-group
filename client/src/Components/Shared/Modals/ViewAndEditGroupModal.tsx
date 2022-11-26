import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "Assets/Styles/ComponentsStyle/viewAndEditModal.scss";
import Button from "../Button";
import IconButton from "../IconButton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IAddGroupForm } from "Types/types";

type Props = {
  groupID: string | undefined;
  cancelBtnText: string;
  cancelBtnAction?: any;
  isOpen: boolean;
  whenClosing: any;
  getGroupsDataFromAPI: any;
};

const ViewAndEditGroupModal: React.FC<Props> = ({
  groupID,
  cancelBtnText,
  cancelBtnAction,
  isOpen,
  whenClosing,
  getGroupsDataFromAPI,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const [editModeIsOpen, setEditModeIsOpen] = useState<boolean>(false);
  const [singleGroupDataFromApi, setsingleGroupDataFromApi] = useState<any>();

  function getSingleGroupDataFromAPI(groupID: string | undefined) {
    if (groupID) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/group/${groupID}`)
        .then((response: any) => {
          let { data } = response;
          setsingleGroupDataFromApi(data.data);
        });
    }
  }

  function postSingleGroupUpdatedInfosToAPI(postData: any) {
    console.log("postData,", postData);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/group/update/${groupID}`,
        postData
      )
      .then((response: any) => {
        console.log("response1", response);
        if (response.data.status) {
          getSingleGroupDataFromAPI(groupID);
          getGroupsDataFromAPI();
          cancelBtnAction();
          reset();
          toast.success("Group Info Updated!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Error!!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  }

  useEffect(() => {
    getSingleGroupDataFromAPI(groupID);
  }, [groupID]);

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

  function editViewGroupModalCancelActions() {
    reset();
    whenClosing();
    setEditModeIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        cancelBtnAction();
        setEditModeIsOpen(false);
        reset();
      }}
      style={customStyles}
      contentLabel="View And Edit Group Modal"
    >
      <form
        onSubmit={handleSubmit((data: any) => {
          console.log("data11111111", data);
          postSingleGroupUpdatedInfosToAPI(data);
          setEditModeIsOpen(false);
          reset();
        })}
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
                    action={() => {
                      setEditModeIsOpen(false);
                      reset();
                    }}
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
                  {!editModeIsOpen && (
                    <td>{singleGroupDataFromApi?.groupName}</td>
                  )}
                  {editModeIsOpen && (
                    <td>
                      <input
                        type={"text"}
                        defaultValue={singleGroupDataFromApi?.groupName}
                        className="modal-input"
                        {...register("groupName", { required: true })}
                      />
                      {errors.ananinami && (
                        <span className="required">*Required</span>
                      )}
                    </td>
                  )}
                </tr>
                {!editModeIsOpen && (
                  <>
                    <tr>
                      <td className="table-title">Created Date:</td>
                      <td>{singleGroupDataFromApi?.createdDate}</td>
                    </tr>
                    <tr>
                      <td className="table-title">Updated Date:</td>
                      <td>{singleGroupDataFromApi?.updatedDate}</td>
                    </tr>
                    <tr>
                      <td className="table-title">Members:</td>
                      <td>Ege kahraman, Ece Yılmaz</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="ve-modal-buttons">
            {!editModeIsOpen && (
              <Button
                text={cancelBtnText}
                size={"md"}
                color={"red-border"}
                action={editViewGroupModalCancelActions}
              />
            )}

            {editModeIsOpen && (
              <Button
                btnType={"submit"}
                text={"Save"}
                size={"md"}
                color={"blue"}
                action={() => {
                  //setEditModeIsOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ViewAndEditGroupModal;
