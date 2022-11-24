import React, { useState } from "react";
import "Assets/Styles/groupsList.scss";
import Badge from "Components/Shared/Badge";
import Button from "Components/Shared/Button";

type Props = {};

const GroupsList: React.FC = (props: Props) => {
  const [addMemberModal, setAddMemberModal] = useState<boolean>(false);

  function openAddMemberModal() {
    console.log("open add member modal");
    setAddMemberModal(true);
  }

  return (
    <div className="members-list-container">
      <div className="members-list-title-row">
        <div className="members-list-title">Groups List</div>
        <Badge text={"13"} color={"blue"} exClass={"member-count"} />
      </div>
      <div className="member-list">{/*  <Member /> */}</div>
      <Button
        iconName={"add"}
        text={"Add Group"}
        color={"blue"}
        size={"xl"}
        action={(): any => openAddMemberModal()}
      />
    </div>
  );
};

export default GroupsList;
