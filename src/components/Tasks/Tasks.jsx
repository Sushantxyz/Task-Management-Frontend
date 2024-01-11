import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { server } from "../../App.jsx";
import axios from "axios";
import Loader from "../Loader.jsx";
import { Context } from "../../main.jsx";
import "../Tasks/Tasks.scss";

const Tasks = () => {
  const [taskData, settaskData] = useState();
  const [editId, seteditId] = useState();
  const [TaskUpdate, setTaskupdate] = useState("");
  const { reload, setreload } = useContext(Context);

  useEffect(() => {
    async function a() {
      const response = await axios.get(import.meta.env.VITE_SERVER, { withCredentials: true });
      settaskData(response.data.data[0].data);
    }
    a();
  }, [reload]);

  function handleDragAndDrop(results) {
    const { source, destination } = results;

    console.log(source, destination);

    if (!destination) return;

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const datasourceind = taskData.findIndex(
      (d) => d.status === source.droppableId
    );

    const datadestineind = taskData.findIndex(
      (d) => d.status === destination.droppableId
    );

    const newSourcetasks = [...taskData[datasourceind].tasks];
    const newDestinationtasks =
      source.droppableId !== destination.droppableId
        ? [...taskData[datadestineind].tasks]
        : newSourcetasks;

    const [deletedtask] = newSourcetasks.splice(source.index, 1);
    newDestinationtasks.splice(destination.index, 0, deletedtask);

    const newdata = [...taskData];

    newdata[datasourceind] = {
      ...taskData[datasourceind],
      tasks: newSourcetasks,
    };
    newdata[datadestineind] = {
      ...taskData[datadestineind],
      tasks: newDestinationtasks,
    };

    settaskData(newdata);

    axios
      .put(import.meta.env.VITE_SERVER, { data: newdata }, { withCredentials: true })
      .then(() => console.log("Data Updated..."))
      .catch(() => console.log("Error while updating data..."));
  }

  function handleEdit(id) {
    axios
      .put(
        import.meta.env.VITE_SERVER + `${id}`,
        { updatedTask: TaskUpdate },
        { withCredentials: true }
      )
      .then(() => {
        console.log("Task Updated...");
        seteditId();
        setreload((prev) => !prev);
      })
      .catch(() => console.log("Error while Updating task..."));
  }

  function handleDelete(id) {
    axios
      .delete(import.meta.env.VITE_SERVER + `${id}`, { withCredentials: true })
      .then(() => {
        console.log("Task Deleted...");
        setreload((prev) => !prev);
      })
      .catch(() => console.log("Error while deleting task..."));
  }

  return (
    <div className="all-Task-Container">
      {!taskData ? (
        <Loader />
      ) : (
        <DragDropContext onDragEnd={handleDragAndDrop}>
          {taskData.map((d, index) => (
            <div className="Task-Container" key={index}>
              <h3>{d.status} task</h3>

              <Droppable droppableId={d.status} type={"group"} key={index}>
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      key={index}
                    >
                      {d.tasks.map((task, i) => (
                        <Draggable
                          draggableId={task._id}
                          key={task._id}
                          index={i}
                        >
                          {(provided) => (
                            <div>
                              {editId !== task._id ? (
                                <div
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                  className="taskBox"
                                >
                                  <p>{task.task}</p>
                                  <div>
                                    <button
                                      onClick={(e) => handleDelete(task._id)}
                                    >
                                      X
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        seteditId(task._id);
                                        setTaskupdate(task.task);
                                      }}
                                    >
                                      E
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="editTask">
                                    <input
                                      value={TaskUpdate}
                                      onChange={(e) =>
                                        setTaskupdate(e.target.value)
                                      }
                                    />
                                    <button
                                      onClick={(e) => handleEdit(task._id)}
                                    >
                                      E
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      )}
    </div>
  );
};

export default Tasks;
