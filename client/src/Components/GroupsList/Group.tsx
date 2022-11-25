import Member from "Components/MemberList/Member";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap-accordion";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Group: React.FC<Props> = ({
  setDeleteModalIsOpen,
  setViewAndEditModalIsOpen,
}) => {
  return (
    <div>
      <Accordion title={"Group 1"}>
        <div className="member-list">
          {[0, 1, 2, 3].map((index) => (
            <Member
              key={index}
              setViewAndEditModalIsOpen={setViewAndEditModalIsOpen}
              memberLocation={"memberGroup"}
              setDeleteModalIsOpen={setDeleteModalIsOpen}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default Group;
