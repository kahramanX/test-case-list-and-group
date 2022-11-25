import React, { useState } from "react";
import "Assets/Styles/groupsList.scss";
import Badge from "Components/Shared/Badge";
import Button from "Components/Shared/Button";
import Group from "./Group";
import QuestionModal from "Components/Shared/Modals/QuestionModal";
import ViewAndEditModal from "Components/Shared/Modals/ViewAndEditModal";

type Props = {};

const GroupsList: React.FC = (props: Props) => {
  const [addMemberModal, setAddMemberModal] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [viewAndEditModalIsOpen, setViewAndEditModalIsOpen] =
    useState<boolean>(false);

  function openAddMemberModal() {
    console.log("open add member modal");
    setAddMemberModal(true);
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
          />
        ))}
      </div>
      <Button
        iconName={"add"}
        text={"Add Group"}
        color={"blue"}
        size={"xl"}
        action={(): any => openAddMemberModal()}
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

      <ViewAndEditModal
        memberID={"111"}
        cancelBtnText={"Cancel"}
        cancelBtnAction={() => setViewAndEditModalIsOpen(false)}
        isOpen={viewAndEditModalIsOpen}
        whenClosing={() => setViewAndEditModalIsOpen(false)}
      />
    </div>
  );
};

export default GroupsList;
