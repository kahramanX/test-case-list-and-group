import Button from "Components/Shared/Button";
import IconButton from "Components/Shared/IconButton";
import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { IMember, Ioptions } from "Types/types";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMemberID: React.Dispatch<React.SetStateAction<string | undefined>>;
  memberLocation: "memberList" | "memberGroup";
  memberData?: IMember | undefined;
  options?: Ioptions[] | undefined | any;
};

const Member: React.FC<Props> = ({
  setSelectedMemberID,
  setDeleteModalIsOpen,
  setViewAndEditModalIsOpen,
  memberLocation,
  memberData,
  options,
}) => {
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(true);
  const [selectedOptionsToAPI, setSelectedOptionsToAPI] =
    useState<Ioptions[]>();

  function openMemberInfoModal(): any {
    console.log("open member info modal");
    setViewAndEditModalIsOpen(true);
    setSelectedMemberID(memberData?._id);
  }

  function addMemberToGroup(): any {
    console.log("add member to group");
    setIsOpenPopover((isOpenPopover) => !isOpenPopover);
    setSelectedMemberID(memberData?._id);
  }

  function deleteMemberFromMemberList(): any {
    console.log("delete member");
    setDeleteModalIsOpen(true);
    setSelectedMemberID(memberData?._id);
  }

  function removeMemberFromGroup(): any {
    console.log("leave group");
    setDeleteModalIsOpen(true);
    setSelectedMemberID(memberData?._id);
  }

  function updateMembersGroupSelections(): any {
    console.log("updated groups");
    console.log("selectedOptionsToAPI", selectedOptionsToAPI);
  }

  const values: Ioptions[] = [];

  return (
    <>
      <div className={`member-row ${!isOpenPopover && "popover-actived"}`}>
        <div className={`member-container`}>
          <div className="member-short-info">
            <div className="member-img">
              <img src={memberData?.imageBase64} alt="member-img" />
            </div>
            <div className="member-fullname">
              {memberData?.firstName} {memberData?.lastName}
            </div>
          </div>
          {memberLocation === "memberList" && (
            <div className="member-action-buttons">
              <IconButton
                iconName={"delete_forever"}
                color={"red"}
                action={(): any => deleteMemberFromMemberList()}
              />
              <IconButton
                iconName={"expand_content"}
                color={"blue"}
                action={(): any => openMemberInfoModal()}
              />
              <IconButton
                iconName={"docs_add_on"}
                color={"blue"}
                exClass={`${!isOpenPopover && "clicked"}`}
                action={(): any => addMemberToGroup()}
              />
            </div>
          )}

          {memberLocation === "memberGroup" && (
            <div className="member-action-buttons">
              <IconButton
                iconName={"logout"}
                color={"red"}
                action={(): any => removeMemberFromGroup()}
              />
              <IconButton
                iconName={"expand_content"}
                color={"blue"}
                action={(): any => openMemberInfoModal()}
              />
            </div>
          )}
        </div>
        {isOpenPopover === false && memberLocation === "memberList" ? (
          <div className="popover-container">
            <Button
              text={"Update Groups"}
              btnType={"button"}
              color={"green"}
              size={"md"}
              exClass={"update-groups-btn"}
              action={updateMembersGroupSelections}
              isDisabled={"disabled"}
            />
            <Select
              multi={true}
              options={options}
              values={values}
              onChange={(values2) => {
                console.log(values2);
                setSelectedOptionsToAPI(values2);
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Member;
