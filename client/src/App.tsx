import React from "react";
import MemberList from "./Components/MemberList/MemberList";
import GroupsList from "Components/GroupsList/GroupsList";
import "./index.scss";
import Modal from "react-modal";
Modal.setAppElement("#root");

const App: React.FC = () => {
  return (
    <div className="App">
      <MemberList />
      <GroupsList />
    </div>
  );
};

export default App;
