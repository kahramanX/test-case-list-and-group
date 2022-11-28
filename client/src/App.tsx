import React, { useEffect, useState } from "react";
import MemberList from "./Components/MemberList/MemberList";
import GroupsList from "Components/GroupsList/GroupsList";
import "./index.scss";
import Modal from "react-modal";
import axios from "axios";
import { IGroupAll, IMemberAll, Ioptions } from "Types/types";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");
const App: React.FC = () => {
  const [memberDataFromApi, setMemberDataFromApi] = useState<IMemberAll>();
  const [groupsDataFromApi, setgroupsDataFromApi] = useState<IGroupAll>();
  const [selectedMemberID, setSelectedMemberID] = useState<string | undefined>(
    ""
  );
  const [selectedGroupID, setSelectedGroupID] = useState<string | undefined>(
    ""
  );

  function getMembersDataFromAPI() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/member/all`)
      .then((response: any) => {
        let { data } = response;
        setMemberDataFromApi(data);
      });
  }

  function getGroupsDataFromAPI() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/group/all`)
      .then((response: any) => {
        let { data } = response;
        setgroupsDataFromApi(data);
      });
  }

  useEffect(() => {
    getMembersDataFromAPI();
    getGroupsDataFromAPI();
  }, [selectedMemberID]);

  const options: Ioptions[] | undefined = groupsDataFromApi?.data?.map(
    (group, index) => {
      return {
        label: group.groupName,
        value: group.groupName + group._id,
        groupID: group._id,
      };
    }
  );

  return (
    <div className="App">
      <MemberList
        setSelectedMemberID={setSelectedMemberID}
        selectedMemberID={selectedMemberID}
        membersData={memberDataFromApi && memberDataFromApi?.data}
        getMembersDataFromAPI={getMembersDataFromAPI}
        options={options}
      />
      <GroupsList
        setSelectedMemberID={setSelectedMemberID}
        selectedMemberID={selectedMemberID}
        groupsData={groupsDataFromApi && groupsDataFromApi?.data}
        getMembersDataFromAPI={getMembersDataFromAPI}
        getGroupsDataFromAPI={getGroupsDataFromAPI}
        setSelectedGroupID={setSelectedGroupID}
        selectedGroupID={selectedGroupID}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
