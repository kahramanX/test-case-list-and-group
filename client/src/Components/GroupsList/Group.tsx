import Member from "Components/MemberList/Member";
import IconButton from "Components/Shared/IconButton";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap-accordion";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteGroupModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditGroupModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Group: React.FC<Props> = ({
  setDeleteModalIsOpen,
  setViewAndEditModalIsOpen,
  setDeleteGroupModalIsOpen,
  setViewAndEditGroupModalIsOpen,
}) => {
  function deleteGroupModalHandle() {
    setDeleteGroupModalIsOpen(true);
    console.log("delete group");
  }

  function viewAndEditGroupModalHandle() {
    setViewAndEditGroupModalIsOpen(true);
    console.log("view update group");
  }

  return (
    <div>
      <Accordion title={"Group 1"}>
        <div className="group-action-buttons">
          <IconButton
            iconName={"delete_forever"}
            color={"red-border"}
            //exClass={`${!isOpenPopover && "clicked"}`}
            action={(): any => deleteGroupModalHandle()}
          />
          <IconButton
            iconName={"expand_content"}
            color={"blue-border"}
            //exClass={`${!isOpenPopover && "clicked"}`}
            action={(): any => viewAndEditGroupModalHandle()}
          />
        </div>
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
