import React, { useEffect, useState } from "react";
import MemberList from "./Components/MemberList/MemberList";
import GroupsList from "Components/GroupsList/GroupsList";
import "./index.scss";
import Modal from "react-modal";
import axios from "axios";
import { IGroupAll, IMemberAll } from "Types/types";
import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");
const App: React.FC = () => {
  const [memberDataFromApi, setMemberDataFromApi] = useState<IMemberAll>();
  const [groupDataFromApi, setGroupDataFromApi] = useState<IGroupAll>();
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
        console.log(response);
        setMemberDataFromApi(data);
      });
  }

  function getGroupsDataFromAPI() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/group/all`)
      .then((response: any) => {
        let { data } = response;
        setGroupDataFromApi(data);
      });
  }

  useEffect(() => {
    getMembersDataFromAPI();
    getGroupsDataFromAPI();
  }, [selectedMemberID]);

  return (
    <div className="App">
      <MemberList
        setSelectedMemberID={setSelectedMemberID}
        selectedMemberID={selectedMemberID}
        membersData={memberDataFromApi && memberDataFromApi?.data}
        getMembersDataFromAPI={getMembersDataFromAPI}
      />
      <GroupsList
        setSelectedMemberID={setSelectedMemberID}
        selectedMemberID={selectedMemberID}
        groupsData={groupDataFromApi && groupDataFromApi?.data}
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
