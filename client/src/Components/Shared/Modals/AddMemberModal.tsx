import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IAddMemberForm } from "Types/types";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  confirmBtnText: string;
  cancelBtnText: string;
  cancelBtnAction: any;
  whenClosing: any;
  getMembersDataFromAPI: any;
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

const AddMemberModal: React.FC<Props> = ({
  isOpen,
  confirmBtnText,
  cancelBtnAction,
  cancelBtnText,
  getMembersDataFromAPI,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const [getBase64Code, setGetBase64Code] = useState<string | undefined>();

  function readFile(files: FileList | null) {
    if (!files || !files[0]) return;

    const FR = new FileReader();

    FR.addEventListener("load", function (evt: any) {
      setGetBase64Code(evt.target.result);
    });

    FR.readAsDataURL(files[0]);
  }

  function postMemberInfoToApi(postData: IAddMemberForm) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/member/add`, postData)
      .then((response: any) => {
        if (response.status) {
          reset();
          setGetBase64Code(undefined);
          toast.success("Member Added To List!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
          });
          cancelBtnAction();
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
      contentLabel="View And Edit Modal"
    >
      <div className="viewedit-modal-text-container">
        <form
          onSubmit={handleSubmit((data: any) => {
            console.log({ ...data, imageBase64: getBase64Code });
            postMemberInfoToApi({ ...data, imageBase64: getBase64Code });
            getMembersDataFromAPI();
          })}
        >
          <div className="ve-modal-header">
            <div className="ve-modal-title">Add Member</div>
            <div className="ve-modal-edit-btn"></div>
          </div>
          <div className="ve-modal-table-container">
            <table>
              <tbody>
                <tr className="table-image">
                  <td className="table-title">
                    {getBase64Code && (
                      <img src={`${getBase64Code}`} alt="upload-an-img" />
                    )}
                  </td>
                  <td>
                    <input
                      type="file"
                      max={"5"}
                      id="img"
                      // name="img"
                      accept="image/*"
                      {...register("imageBase64", { required: true })}
                      onChange={(event) => {
                        readFile(event.target.files);
                      }}
                    />
                    <span className="required">*Max 5MB</span>
                    {errors.imageBase64 && (
                      <>
                        <br />
                        <span className="required">*Required</span>
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-title">First Name:</td>
                  <td>
                    <input
                      type={"text"}
                      className="modal-input"
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <span className="required">*Required</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-title">Last Name: </td>

                  <td>
                    <input
                      type={"text"}
                      className="modal-input"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span className="required">*Required</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-title">E-mail:</td>

                  <td>
                    <input
                      type={"email"}
                      className="modal-input"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="required">*Required</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-title">Phone:</td>

                  <td>
                    <input
                      type={"phone"}
                      className="modal-input"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                      <span className="required">*Required</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="table-title">Birthday:</td>

                  <td>
                    <input
                      type={"date"}
                      className="modal-input"
                      {...register("birthday", { required: true })}
                    />
                    {errors.birthday && (
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
                cancelBtnAction();
                reset();
              }}
            />
            <Button
              btnType={"submit"}
              text={confirmBtnText}
              size={"md"}
              color={"blue"}
              action={() => {
                getMembersDataFromAPI();
              }}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
