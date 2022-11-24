import React from "react";
import Member from "./Member";
import "Assets/Styles/membersList.scss";
import Badge from "Components/Shared/Badge";
import Button from "Components/Shared/Button";

type Props = {};

const MemberList: React.FC = (props: Props) => {
  function openAddMemberModal(): any {
    return console.log("open add member modal");
  }

  return (
    <div className="members-list-container">
      <div className="members-list-title-row">
        <div className="members-list-title">Member List</div>
        <Badge text={"31"} color={"blue"} exClass={"member-count"} />
      </div>
      <div className="members-list">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <Member key={index} />
        ))}
      </div>
      <Button
        iconName={"add"}
        text={"Add Member"}
        color={"blue"}
        action={(): any => openAddMemberModal}
      />
    </div>
  );
};

export default MemberList;
