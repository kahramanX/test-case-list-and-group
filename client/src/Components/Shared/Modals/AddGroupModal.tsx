import React from "react";
import Modal from "react-modal";
import Button from "../Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { IAddGroupForm } from "Types/types";

type Props = {
  isOpen: boolean;
  confirmBtnText: string;
  cancelBtnText: string;
  cancelBtnAction: any;
  whenClosing: any;
  getGroupsDataFromAPI: any;
};

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

const AddGroupModal: React.FC<Props> = ({
  isOpen,
  confirmBtnText,
  cancelBtnAction,
  cancelBtnText,
  getGroupsDataFromAPI,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  function postGroupInfoToApi(postData: IAddGroupForm) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/group/add`, postData)
      .then((response: any) => {
        if (response.status) {
          cancelBtnAction();
          getGroupsDataFromAPI();
          reset();
          toast.success("Group Added To List!", {
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        cancelBtnAction();
        reset();
      }}
      style={customStyles}
      contentLabel="Add Group Modal"
    >
      <form
        onSubmit={handleSubmit((data: IAddGroupForm) => {
          console.log("data1", data);
          postGroupInfoToApi(data);
          reset();
        })}
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
                      className="modal-input"
                      {...register("groupName", { required: true })}
                    />
                    {errors.groupName && (
                      <span className="required">*Required</span>
                    )}
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
              action={() => {
                reset();
                cancelBtnAction();
              }}
            />
            <Button
              text={confirmBtnText}
              size={"md"}
              btnType={"submit"}
              color={"blue"}
              action={() => console.log("added")}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddGroupModal;
