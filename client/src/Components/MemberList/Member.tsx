import IconButton from "Components/Shared/IconButton";
import React, { useState } from "react";
import Select from "react-dropdown-select";
import { IMember } from "Types/types";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMemberID: React.Dispatch<React.SetStateAction<string | undefined>>;
  memberLocation: "memberList" | "memberGroup";
  memberData?: IMember | undefined;
};

const Member: React.FC<Props> = ({
  setSelectedMemberID,
  setDeleteModalIsOpen,
  setViewAndEditModalIsOpen,
  memberLocation,
  memberData,
}) => {
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(true);

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

  interface Ioptions {
    label: string;
    value: string;
  }

  const options: Ioptions[] = [
    {
      label: "label1",
      value: "label1",
    },
    {
      label: "label2",
      value: "label2",
    },
    {
      label: "label3",
      value: "label3",
    },
  ];

  const values: Ioptions[] = [
    {
      label: "label1",
      value: "label1",
    },
  ];

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
            <Select
              multi={true}
              options={options}
              values={values}
              onChange={(values) => console.log(values)}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Member;
