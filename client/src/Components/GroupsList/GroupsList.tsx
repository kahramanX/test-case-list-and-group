import React, { useState } from "react";
import "Assets/Styles/groupsList.scss";
import Badge from "Components/Shared/Badge";
import Button from "Components/Shared/Button";
import Group from "./Group";
import QuestionModal from "Components/Shared/Modals/QuestionModal";
import ViewAndEditModal from "Components/Shared/Modals/ViewAndEditModal";
import AddGroupModal from "Components/Shared/Modals/AddGroupModal";
import ViewAndEditGroupModal from "Components/Shared/Modals/ViewAndEditGroupModal";

type Props = {};

const GroupsList: React.FC = (props: Props) => {
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

  return (
    <div className="members-list-container">
      <div className="members-list-title-row">
        <div className="members-list-title">Groups List</div>
        <Badge text={"13"} color={"blue"} exClass={"member-count"} />
      </div>
      <div className="member-list">
        {[1, 2, 3].map((index) => (
          <Group
            key={index}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
            setViewAndEditModalIsOpen={setViewAndEditModalIsOpen}
            setViewAndEditGroupModalIsOpen={setViewAndEditGroupModalIsOpen}
            setDeleteGroupModalIsOpen={setDeleteGroupModalIsOpen}
          />
        ))}
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
          console.log("confirmmmmm");
        }}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => {
          console.log("cancelllllll");
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
          console.log("confirmmmmm");
        }}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => {
          console.log("cancelllllll");
          setDeleteGroupModalIsOpen(false);
        }}
        whenClosing={() => setDeleteGroupModalIsOpen(false)}
      />

      <ViewAndEditModal
        memberID={"111"}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setViewAndEditModalIsOpen(false)}
        isOpen={viewAndEditModalIsOpen}
        whenClosing={() => setViewAndEditModalIsOpen(false)}
      />

      <ViewAndEditGroupModal
        groupID={"11222"}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setViewAndEditGroupModalIsOpen(false)}
        isOpen={viewAndEditGroupModalIsOpen}
        whenClosing={() => setViewAndEditGroupModalIsOpen(false)}
      />

      <AddGroupModal
        isOpen={addGroupModal}
        confirmBtnText={"Add"}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setAddGroupModal(false)}
        whenClosing={() => setAddGroupModal(false)}
      />
    </div>
  );
};

export default GroupsList;
