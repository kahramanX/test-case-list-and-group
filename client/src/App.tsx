import React from "react";
import MemberList from "./Components/MemberList/MemberList";
import GroupsList from "Components/GroupsList/GroupsList";
import "./index.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <MemberList />
      <GroupsList />
    </div>
  );
};

export default App;
