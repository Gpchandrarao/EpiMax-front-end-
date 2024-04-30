import React, { useState } from "react";
import "./styles/TaskList.css";

const TaskList = () => {
  const [taskInput, setTaskInpu] = useState("");
  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState("");

  const handelTask = () => {
    if (taskInput === "") {
      setError("Plase Enter a task description..");
      return;
    }
    const newTask = {
      id: Date.now(),
      description: taskInput,
      completed: false,
    };

    setTaskData([...taskData, newTask]);
    setTaskInpu("");
    setError("");
  };

  const handelTaskInput = (e) => {
    setTaskInpu(e.target.value);
  };

  const handelDeleteTasks = (id) => {
    const updateTasks = taskData.filter((task) => task.id !== id);
    setTaskData(updateTasks);
  };

  const completeTask = (id) => {
    const updateTasks = taskData.map((each) => {
      if (each.id === id) {
        return { ...each, completed: !each.completed };
      }
      return each;
    });
    setTaskData(updateTasks);
  };

  return (
    <div className="task-container">
      <h1>Add a Task</h1>
      <div className="task-items-container">
        <input
          type="text"
          placeholder="Enter your Task...."
          value={taskInput}
          onChange={handelTaskInput}
          autoFocus
        />
        <button type="button" onClick={handelTask}>
          Add Task
        </button>
      </div>
      {error && <p className="error">{error}</p>}

      <ul className="ul-container">
        {taskData.map((task, index) => (
          <li key={index}>
            <input type="checkbox" onClick={() => completeTask(task.id)} />
            <p className={`${task.completed ? "line" : ""}`}>
              {task.description}
            </p>
            <button type="button" onClick={() => handelDeleteTasks(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
