import Member from "Components/MemberList/Member";
import IconButton from "Components/Shared/IconButton";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap-accordion";
import { IGroup } from "Types/types";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteGroupModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditGroupModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMemberID: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedGroupID: React.Dispatch<React.SetStateAction<string | undefined>>;
  groupData: IGroup;
  getGroupsDataFromAPI: any;
};

const Group: React.FC<Props> = ({
  setDeleteModalIsOpen,
  setViewAndEditModalIsOpen,
  setDeleteGroupModalIsOpen,
  setViewAndEditGroupModalIsOpen,
  setSelectedMemberID,
  setSelectedGroupID,
  groupData,
  getGroupsDataFromAPI,
}) => {
  function deleteGroupModalHandle() {
    setDeleteGroupModalIsOpen(true);
    setSelectedGroupID(groupData?._id);
    console.log("delete group");
  }

  function viewAndEditGroupModalHandle() {
    setViewAndEditGroupModalIsOpen(true);
    setSelectedGroupID(groupData?._id);
    getGroupsDataFromAPI();
    console.log("view update group");
  }

  return (
    <div>
      <Accordion title={groupData?.groupName}>
        <div className="group-header-container">
          <div className="group-header-text">Group Settings:</div>
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
        </div>
        <div className="member-list">
          {[0, 1, 2].map((index) => (
            <Member
              key={index}
              setViewAndEditModalIsOpen={setViewAndEditModalIsOpen}
              memberLocation={"memberGroup"}
              setDeleteModalIsOpen={setDeleteModalIsOpen}
              setSelectedMemberID={setSelectedMemberID}
            />
          ))}
        </div>
      </Accordion>
    </div>
  );
};

export default Group;
