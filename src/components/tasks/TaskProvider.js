import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const TaskContext = createContext();

// This component establishes what data can be used.
export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  const getTasks = () => {
    return fetch("http://localhost:8088/tasks")
      .then((res) => res.json())
      .then(setTasks);
  };

  const addTask = (task) => {
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then((response) => response.json())
    .then(getTasks)
  };

  const getTaskById = (id) => {
    return fetch(
      `http://localhost:8088/tasks/${id}`
    ).then((res) => res.json());
  };

  const deleteTask = (taskId) => {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: "DELETE",
    }).then(getTasks);
  };

  const updateTask = (task) => {
    return fetch(`http://localhost:8088/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(getTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        addTask,
        getTaskById,
        deleteTask,
        updateTask,
        searchTerms,
        setSearchTerms
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
