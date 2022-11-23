import React from "react";
import Member from "./Member";
import "Assets/Styles/membersList.scss";

type Props = {};

const MemberList: React.FC = (props: Props) => {
  function openAddMemberModal(): void {
    console.log("open add member modal");
  }

  return (
    <div className="members-list-container">
      <div className="members-list-title-row">
        <div className="members-list-title">Member List</div>
        <div className="members-count">31</div>
      </div>
      <div className="members-list">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <Member key={index} />
        ))}
      </div>
      <button className="add-members-btn" onClick={openAddMemberModal}>
        <span className="material-symbols-rounded">add</span>
        Add Member
      </button>
    </div>
  );
};

export default MemberList;
