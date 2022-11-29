import axios from "axios";
import Button from "Components/Shared/Button";
import IconButton from "Components/Shared/IconButton";
import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { toast } from "react-toastify";
import { IGroup, IMember, Ioptions, ISelectedGroup } from "Types/types";

type Props = {
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewAndEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMemberID: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedGroupID: React.Dispatch<React.SetStateAction<string | undefined>>;
  getMembersDataFromAPI?: any;
  getGroupsDataFromAPI?: any;
  selectedMemberID: string | undefined;
  selectedGroupID?: string | undefined;
  memberLocation: "memberList" | "memberGroup";
  memberData?: IMember | undefined;
  groupData?: IGroup;
  options?: Ioptions[] | undefined | any;
  groupsOfMember?: Ioptions[] | undefined | any;
};

const Member: React.FC<Props> = ({
  setSelectedMemberID,
  setSelectedGroupID,
  setDeleteModalIsOpen,
  setViewAndEditModalIsOpen,
  getMembersDataFromAPI,
  getGroupsDataFromAPI,
  memberLocation,
  memberData,
  options,
  groupsOfMember,
  selectedMemberID,
  selectedGroupID,
  groupData,
}) => {
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>(true);
  const [selectedOptionsToAPI, setSelectedOptionsToAPI] = useState<
    Ioptions[] | undefined | any
  >();

  function openMemberInfoModal(): any {
    console.log("open member info modal");
    setViewAndEditModalIsOpen(true);
    setSelectedMemberID(memberData?._id);
  }

  function addMemberToGroup(): any {
    console.log("add member to group");
    setIsOpenPopover((isOpenPopover) => !isOpenPopover);
    setSelectedMemberID(memberData?._id);
    setSelectedOptionsToAPI(undefined);
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
    setSelectedGroupID(groupData?._id);
    console.log(selectedGroupID);
  }

  function updateMembersGroupSelections(): any {
    console.log("updated groups");
    setSelectedMemberID(memberData?._id);
    postSelectedGroupsToMemberWithAPI(selectedMemberID, selectedOptionsToAPI);
  }

  function postSelectedGroupsToMemberWithAPI(
    memberID: any,
    postData: ISelectedGroup[]
  ) {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/member/to/group/${memberID}`,
        { selectedGroups: postData }
      )
      .then((response: any) => {
        if (response.data.status) {
          getMembersDataFromAPI();
          getGroupsDataFromAPI();
          setIsOpenPopover((isOpenPopover) => !isOpenPopover);
          setSelectedOptionsToAPI(undefined);
          toast.success("Updated Groups Selections!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Error!!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  }

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
            {selectedOptionsToAPI != undefined ? (
              <Button
                text={"Update Groups"}
                btnType={"button"}
                color={"green"}
                size={"md"}
                exClass={"update-groups-btn"}
                action={() => updateMembersGroupSelections()}
              />
            ) : null}
            <Select
              options={options}
              values={groupsOfMember}
              keepSelectedInList={false}
              disabledLabel={"disabled"}
              clearOnSelect={false}
              backspaceDelete={false}
              multi={true}
              onChange={(values2) => {
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
