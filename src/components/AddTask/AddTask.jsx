import axios from "axios";
import React, { useContext, useState } from "react";
// import { server } from "../../App";
import { Context } from "../../main";
import "../AddTask/AddTask.scss";

const AddTask = () => {
  const [Task, setTask] = useState("");

  const { setreload } = useContext(Context);

  function handlesubmit(e) {
    e.preventDefault();
    axios
      .post(
        import.meta.env.VITE_SERVER,
        {
          newTask: Task,
        },
        { withCredentials: true }
      )
      .then(() => {
        setreload((prev) => !prev);
        setTask("");
      })
      .catch(() => console.log("Error while creating task"));
  }

  return (
    <form className="addTaskForm" onSubmit={(e) => handlesubmit(e)} action="">
      <input
        placeholder="Enter your Task"
        type="text"
        onChange={(e) => setTask(e.target.value)}
      />
      <button disabled={Task === ""} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddTask;
