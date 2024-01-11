import React from "react";
import AddTask from "../components/AddTask/AddTask";
import Tasks from "../components/Tasks/Tasks";

const Home = () => {
  return (
    <>
      <AddTask />
      <Tasks />
    </>
  );
};

export default Home;
