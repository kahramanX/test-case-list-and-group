import React, { useState } from "react";
import Member from "./Member";
import "Assets/Styles/membersList.scss";
import Badge from "Components/Shared/Badge";
import Button from "Components/Shared/Button";
import QuestionModal from "Components/Shared/Modals/QuestionModal";
import ViewAndEditModal from "Components/Shared/Modals/ViewAndEditModal";
import AddMemberModal from "Components/Shared/Modals/AddMemberModal";
import { IMember, Ioptions } from "Types/types";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  membersData: IMember[] | undefined;
  setSelectedMemberID: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedGroupID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedMemberID: string | undefined;
  getMembersDataFromAPI?: any;
  getGroupsDataFromAPI: any;
  options: Ioptions[] | undefined;
};

const MemberList: React.FC<Props> = ({
  membersData,
  setSelectedMemberID,
  setSelectedGroupID,
  selectedMemberID,
  getMembersDataFromAPI,
  getGroupsDataFromAPI,
  options,
}) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [viewAndEditModalIsOpen, setViewAndEditModalIsOpen] =
    useState<boolean>(false);
  const [addMemberModal, setAddMemberModal] = useState<boolean>(false);

  function openAddMemberModal() {
    console.log("open add member modal");
    setAddMemberModal(true);
  }

  function questionModalClosingActions() {
    console.log("closing");
    setDeleteModalIsOpen(false);
  }

  function deleteMemberFromMemberListWithAPI(memberID: string | undefined) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/member/delete/${memberID}`)
      .then((response: any) => {
        console.log(response);
        if (response.data.status) {
          toast.success("Member Deleted From List!", {
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
    <div className="members-list-container">
      <div className="members-list-title-row">
        <div className="members-list-title">Member List</div>
        <Badge
          text={membersData?.length}
          color={"blue"}
          exClass={"member-count"}
        />
      </div>

      <div className="members-list">
        {membersData?.map((memberData, index) => {
          return (
            <Member
              key={index}
              memberData={memberData}
              options={options}
              setDeleteModalIsOpen={setDeleteModalIsOpen}
              setViewAndEditModalIsOpen={setViewAndEditModalIsOpen}
              setSelectedMemberID={setSelectedMemberID}
              memberLocation={"memberList"}
              groupsOfMember={memberData?.groups}
              selectedMemberID={selectedMemberID}
              getMembersDataFromAPI={getMembersDataFromAPI}
              getGroupsDataFromAPI={getGroupsDataFromAPI}
              setSelectedGroupID={setSelectedGroupID}
            />
          );
        })}

        {membersData?.length === 0 && (
          <div className="center-no-data-text">
            There is no member, please add member
          </div>
        )}
      </div>

      <Button
        iconName={"add"}
        text={"Add Member"}
        color={"blue"}
        size={"xl"}
        action={(): any => openAddMemberModal()}
      />

      {/* MODALS */}

      <QuestionModal
        modalTitle={"Are you sure you want to delete this member?"}
        modalDesc={
          "If you delete this member, they will also be removed from any groups they join."
        }
        confirmBtnText={"Yes, I am sure"}
        confirmBtnAction={() => {
          deleteMemberFromMemberListWithAPI(selectedMemberID);
          getMembersDataFromAPI();
          setDeleteModalIsOpen(false);
        }}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => {
          console.log("cancel");
          setDeleteModalIsOpen(false);
        }}
        isOpen={deleteModalIsOpen}
        whenClosing={() => questionModalClosingActions()}
      />
      <ViewAndEditModal
        memberID={selectedMemberID}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setViewAndEditModalIsOpen(false)}
        isOpen={viewAndEditModalIsOpen}
        getMembersDataFromAPI={getMembersDataFromAPI}
        whenClosing={() => setViewAndEditModalIsOpen(false)}
      />

      <AddMemberModal
        isOpen={addMemberModal}
        confirmBtnText={"Add"}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setAddMemberModal(false)}
        getMembersDataFromAPI={getMembersDataFromAPI}
        whenClosing={() => setAddMemberModal(false)}
      />
    </div>
  );
};

export default MemberList;
