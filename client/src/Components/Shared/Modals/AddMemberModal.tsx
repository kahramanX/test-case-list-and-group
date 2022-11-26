import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IAddMemberForm } from "Types/types";

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

  const [getBase64Code, setGetBase64Code] = useState<string>();

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
        // let { data } = response;
        //setMemberDataFromApi(data);
      });
  }

  useEffect(() => {}, []);

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
          <div className="ve-modal-title">Add Member</div>
          <div className="ve-modal-edit-btn"></div>
        </div>
        <div className="ve-modal-table-container">
          <table>
            <tbody>
              <tr className="table-image">
                <td className="table-title">
                  <img src={`${getBase64Code}`} alt="upload-an-img" />
                </td>
                <td>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={(event) => {
                      readFile(event.target.files);
                      console.log(event.target);
                    }}
                  />
                  {getBase64Code === undefined && (
                    <span className="required">*Required</span>
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
                  {errors.lastName && errors.name.type === "required" && (
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
            action={() => {
              console.log("saved");
              getMembersDataFromAPI();
              cancelBtnAction();
              handleSubmit((data: any) => {
                //postMemberInfoToApi();
                console.log(data);
                //reset({});
              });
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
