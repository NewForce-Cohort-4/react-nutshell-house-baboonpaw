import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "./TaskProvider";
import "bootstrap/dist/css/bootstrap.min.css";

//Gets tasks from database, maps over tasks to render to page
export const TaskList = () => {
  const [taskToEditId, setTaskToEditId] = useState(0);
  const [task, setTask] = useState({});
  const { tasks, getTasks, updateTask, getTaskById } = useContext(TaskContext);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleControlledInputChange = (event) => {
    const newTask = { ...task };
    newTask[event.target.name] = event.target.value;
    setTask(newTask);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSaveTask = () => {
    updateTask({
      id: taskToEditId,
      name: task.name,
      completionDate: task.completionDate,
      completed: false,
    }).then(() => {
      setTaskToEditId(0);
    });
  };

  const handleCheckBox = (task) => {
    updateTask({
      id: task.id,
      name: task.name,
      completionDate: task.completionDate,
      completed: !task.completed,
    }).then(getTasks);
  };

  const handleCompletedToggle = () => {
    setShowCompleted(!showCompleted)
    getTasks()
  }

  const calculateCompleted = () => {
    let completed = []
    let value 
    tasks.forEach((task) => {
      
      if(task.completed === true) {
        completed.push(task)
      }
      
    })
    console.log(completed);
    let completedValue = completed.length
    let tasksValue = tasks.length
    value = (completedValue / tasksValue) * 100
    return value
  }


  return (
    <div className="tasks">
      <button
        className="btn btn-primary completed-btn"
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleCompletedToggle();
        }}
      >
        {showCompleted ? <>Show To-Do List</> : <>Show Completed Tasks</>}
      </button>
      <div className="progressDiv" style={{ width: "100%" }}>
        <label htmlFor="taskProgress" className="progressLabel">Task progress: </label>
        <progress
          id="taskProgress"
          value={calculateCompleted()}
          max="100"
          style={{ width: "85%" }}
        ></progress>
        <span className="progressSpan">{Math.round(calculateCompleted())}%</span>
      </div>
      {tasks.map((task) => {
        if (task.id === taskToEditId) {
          return (
            <form>
              <fieldset>
                <div className="form-group taskForm">
                  <label htmlFor="taskName">Task: </label>
                  <input
                    type="text"
                    id="taskName"
                    name="name"
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Task name"
                    onChange={handleControlledInputChange}
                    defaultValue={task.name}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="form-group">
                  <label htmlFor="taskName">Task Completion Date: </label>
                  <input
                    type="text"
                    id="taskCompletionDate"
                    name="completionDate"
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Task completion date"
                    onChange={handleControlledInputChange}
                    defaultValue={task.completionDate}
                  />
                </div>
              </fieldset>
              <button
                className="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
                  handleSaveTask();
                }}
              >
                Save Task
              </button>
            </form>
          );
        } else if (showCompleted === false && task.completed === false) {
          return (
            <section className="card text-justify text-center taskContainer">
              <h3 className="task__name">{task.name}</h3>
              <div className="task_date">
                <strong>Completion Date:</strong> {task.completionDate}
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  defaultChecked={task.completed}
                  onChange={() => {
                    getTaskById(task.id).then((task) => {
                      setTask(task);
                      handleCheckBox(task);
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="completed">
                  {task.completed ? <>Mark Incomplete</> : <>Mark Completed</>}
                </label>
              </div>

              <button
                className="btn btn-primary edit-btn"
                onClick={() => {
                  setTaskToEditId(task.id);
                  getTaskById(task.id).then((task) => {
                    setTask(task);
                  });
                }}
              >
                Edit Task
              </button>
            </section>
          );
        } else if (showCompleted === true && task.completed === true) {
          return (
            <section className="card text-justify text-center taskContainer">
              <h3 className="task__name">{task.name}</h3>
              <div className="task_date">
                <strong>Completion Date:</strong> {task.completionDate}
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="completed"
                  name="completed"
                  defaultChecked={task.completed}
                  onChange={() => {
                    getTaskById(task.id).then((task) => {
                      setTask(task);
                      handleCheckBox(task);
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="completed">
                  {task.completed ? <>Mark Incomplete</> : <>Mark Completed</>}
                </label>
              </div>

              <button
                className="btn btn-primary edit-btn"
                onClick={() => {
                  setTaskToEditId(task.id);
                  getTaskById(task.id).then((task) => {
                    setTask(task);
                  });
                }}
              >
                Edit Task
              </button>
            </section>
          );
        }
      })}
    </div>
  );
};