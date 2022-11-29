import React, { useState } from "react";
import "Assets/Styles/groupsList.scss";
import "Assets/Styles/ComponentsStyle/accordion.scss";

import Badge from "Components/Shared/Badge";
import Button from "Components/Shared/Button";
import Group from "./Group";
import QuestionModal from "Components/Shared/Modals/QuestionModal";
import ViewAndEditModal from "Components/Shared/Modals/ViewAndEditModal";
import AddGroupModal from "Components/Shared/Modals/AddGroupModal";
import ViewAndEditGroupModal from "Components/Shared/Modals/ViewAndEditGroupModal";
import { IGroup } from "Types/types";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  groupsData: IGroup[] | undefined;
  setSelectedMemberID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedMemberID: string | undefined;
  getMembersDataFromAPI: any;
  getGroupsDataFromAPI: any;
  setSelectedGroupID: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedGroupID: string | undefined;
};

const GroupsList: React.FC<Props> = ({
  groupsData,
  setSelectedMemberID,
  setSelectedGroupID,
  selectedMemberID,
  selectedGroupID,
  getMembersDataFromAPI,
  getGroupsDataFromAPI,
}) => {
  const [addGroupModal, setAddGroupModal] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [viewAndEditModalIsOpen, setViewAndEditModalIsOpen] =
    useState<boolean>(false);
  const [deleteGroupModalIsOpen, setDeleteGroupModalIsOpen] =
    useState<boolean>(false);
  const [viewAndEditGroupModalIsOpen, setViewAndEditGroupModalIsOpen] =
    useState<boolean>(false);

  function openaddGroupModal() {
    console.log("open add member modal");
    setAddGroupModal(true);
  }

  function questionModalClosingActions() {
    console.log("closing");
    setDeleteModalIsOpen(false);
  }

  function deleteGroupFromGroupListWithAPI(groupID: string | undefined) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/group/delete/${groupID}`)
      .then((response: any) => {
        console.log(response);
        if (response.data.status) {
          getGroupsDataFromAPI();
          getMembersDataFromAPI();
          toast.success("Group Deleted From List!", {
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

  function postRemoveMemberFromGrop(
    memberID: string | undefined,
    groupID: string | undefined
  ) {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/group/remove/member/${memberID}/${groupID}`
      )
      .then((response: any) => {
        if (response.data.status) {
          getMembersDataFromAPI();
          getGroupsDataFromAPI();
          toast.success("Member Removed From The Group!", {
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
    <div className="members-list-container groups-section">
      <div className="members-list-title-row">
        <div className="members-list-title">Groups List</div>
        <Badge
          text={groupsData?.length}
          color={"blue"}
          exClass={"member-count"}
        />
      </div>
      <div className="member-list">
        {groupsData?.map((groupData, index) => (
          <Group
            key={index}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            setViewAndEditModalIsOpen={setViewAndEditModalIsOpen}
            setViewAndEditGroupModalIsOpen={setViewAndEditGroupModalIsOpen}
            setDeleteGroupModalIsOpen={setDeleteGroupModalIsOpen}
            setSelectedMemberID={setSelectedMemberID}
            selectedMemberID={selectedMemberID}
            selectedGroupID={selectedGroupID}
            setSelectedGroupID={setSelectedGroupID}
            getGroupsDataFromAPI={getGroupsDataFromAPI}
            groupData={groupData}
          />
        ))}

        {groupsData?.length === 0 && (
          <div className="center-no-data-text">
            There is no group, please add group
          </div>
        )}
      </div>
      <Button
        iconName={"add"}
        text={"Add Group"}
        color={"blue"}
        size={"xl"}
        action={(): any => openaddGroupModal()}
      />

      {/* MODALS */}

      <QuestionModal
        isOpen={deleteModalIsOpen}
        modalTitle={
          "Are you sure you want to remove this member from the group?"
        }
        modalDesc={
          "This member is just removed from the group. It is not deleted from the members list."
        }
        confirmBtnText={"Yes, I am sure"}
        confirmBtnAction={() => {
          console.log("confirm");
          postRemoveMemberFromGrop(selectedMemberID, selectedGroupID);
          getGroupsDataFromAPI();
          setDeleteModalIsOpen(false);
        }}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => {
          setDeleteModalIsOpen(false);
        }}
        whenClosing={() => questionModalClosingActions()}
      />

      <QuestionModal
        isOpen={deleteGroupModalIsOpen}
        modalTitle={"Are you sure you want to delete the group?"}
        modalDesc={
          "If you delete the group, members registered to the group will be removed from the group."
        }
        confirmBtnText={"Yes, I am sure"}
        confirmBtnAction={() => {
          console.log("confim");
          deleteGroupFromGroupListWithAPI(selectedGroupID);
          setDeleteGroupModalIsOpen(false);
        }}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => {
          console.log("cancel");
          setDeleteGroupModalIsOpen(false);
        }}
        whenClosing={() => setDeleteGroupModalIsOpen(false)}
      />

      <ViewAndEditModal
        memberID={selectedMemberID}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setViewAndEditModalIsOpen(false)}
        isOpen={viewAndEditModalIsOpen}
        whenClosing={() => setViewAndEditModalIsOpen(false)}
        getMembersDataFromAPI={getMembersDataFromAPI}
      />

      <ViewAndEditGroupModal
        groupID={selectedGroupID}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setViewAndEditGroupModalIsOpen(false)}
        isOpen={viewAndEditGroupModalIsOpen}
        whenClosing={() => setViewAndEditGroupModalIsOpen(false)}
        getGroupsDataFromAPI={getGroupsDataFromAPI}
      />

      <AddGroupModal
        isOpen={addGroupModal}
        confirmBtnText={"Add"}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setAddGroupModal(false)}
        whenClosing={() => setAddGroupModal(false)}
        getGroupsDataFromAPI={getGroupsDataFromAPI}
      />
    </div>
  );
};

export default GroupsList;
