import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "./TaskProvider";

//Gets tasks from database, maps over tasks to render to page
export const TaskList = () => {
  const [taskToEditId, setTaskToEditId] = useState(0);
  const [task, setTask] = useState({});
  const { tasks, getTasks, updateTask, getTaskById } = useContext(TaskContext);

  const handleControlledInputChange = (event) => {
    const newTask = { ...task };
    newTask[event.target.name] = event.target.value;
    setTask(newTask);
  };

  useEffect(() => {
    console.log("TaskList: useEffect - getTasks");
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
      completed: true,
    }).then(getTasks);
  };

  return (
    <div className="tasks">
      {tasks.map((task) => {
        if (task.id === taskToEditId) {
          return (
            <form>
              <fieldset>
                <div className="form-group">
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
                {<>Save Task</>}
              </button>
            </form>
          );
        } else if (task.completed === false) {
          return (
            <section className="task">
              <h3 className="task__name">{task.name}</h3>
              <div className="task_date">
                <strong>Completion Date:</strong> {task.completionDate}
              </div>
              <input
                type="checkbox"
                id="completed"
                name="completed"
                onChange={() => {
                  console.log(task.id);
                  getTaskById(task.id).then((task) => {
                    setTask(task);
                    handleCheckBox(task);
                  });
                }}
              />

              <button
                className="btn btn-primary"
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