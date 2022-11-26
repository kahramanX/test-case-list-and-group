import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "Assets/Styles/ComponentsStyle/viewAndEditModal.scss";
import Button from "../Button";
import IconButton from "../IconButton";
import { IMember } from "Types/types";
import { IAddMemberForm } from "Types/types";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();
  const [editModeIsOpen, setEditModeIsOpen] = useState<boolean>(false);
  const [singleMemberDataFromApi, setSingleMemberDataFromApi] =
    useState<IMember>();
  const [getBase64Code, setGetBase64Code] = useState<string | undefined>();

  function readFile(files: FileList | null) {
    if (!files || !files[0]) return;

    const FR = new FileReader();

    FR.addEventListener("load", function (evt: any) {
      setGetBase64Code(evt.target.result);
    });

    FR.readAsDataURL(files[0]);
  }

  function editViewModalCancelActions() {
    setGetBase64Code(undefined);
    whenClosing();
    setEditModeIsOpen(false);
    reset();
  }

  function getSingleMemberDataFromAPI(memberID: string | undefined) {
    if (memberID) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/member/${memberID}`)
        .then((response: any) => {
          let { data } = response;
          setSingleMemberDataFromApi(data.data);
        });
    }
  }

  function postSingleMemberUpdatedInfosToAPI(postData: IAddMemberForm) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/member/add`, postData)
      .then((response: any) => {
        if (response.status) {
          reset();
          setGetBase64Code(undefined);
          toast.success("Member Info Updated!", {
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
        setGetBase64Code(undefined);
        reset();
      }}
      style={customStyles}
      contentLabel="View And Edit Modal"
    >
      <form
        onSubmit={handleSubmit((data: any) => {
          console.log({ ...data, imageBase64: getBase64Code });
          //postMemberInfoToApi({ ...data, imageBase64: getBase64Code });
          //getMembersDataFromAPI();
        })}
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
                    action={() => {
                      setGetBase64Code(undefined);
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
                <tr className="table-image">
                  <td className="table-title">
                    {!editModeIsOpen && (
                      <img
                        src={singleMemberDataFromApi?.imageBase64}
                        alt="member-img"
                      />
                    )}

                    {editModeIsOpen && (
                      <img
                        src={
                          getBase64Code === undefined
                            ? singleMemberDataFromApi?.imageBase64
                            : getBase64Code
                        }
                        alt="update-an-img"
                      />
                    )}
                  </td>
                  <td>
                    {editModeIsOpen && (
                      <>
                        <input
                          type="file"
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
                      </>
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
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && (
                        <span className="required">*Required</span>
                      )}
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
                        {...register("lastName", { required: true })}
                      />
                      {errors.lastName && (
                        <span className="required">*Required</span>
                      )}
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
                        {...register("email", { required: true })}
                      />

                      {errors.email && (
                        <span className="required">*Required</span>
                      )}
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
                        {...register("phone", { required: true })}
                      />

                      {errors.phone && (
                        <span className="required">*Required</span>
                      )}
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
                        {...register("birthday", { required: true })}
                      />

                      {errors.birthday && (
                        <span className="required">*Required</span>
                      )}
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
            {!editModeIsOpen && (
              <Button
                text={cancelBtnText}
                size={"md"}
                color={"red-border"}
                action={editViewModalCancelActions}
              />
            )}

            {editModeIsOpen && (
              <Button
                btnType={"submit"}
                text={"Save"}
                size={"md"}
                color={"blue"}
                action={() => {
                  //getMembersDataFromAPI();
                  //setEditModeIsOpen(false);
                  //reset();
                  // save ettikten sonra bilgileri tekrar çek getSingleMemberDataFromAPI(memberID);
                }}
              />
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ViewAndEditModal;
