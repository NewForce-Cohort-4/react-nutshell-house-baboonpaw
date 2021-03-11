import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "./TaskProvider";

import { useHistory, useParams } from "react-router-dom";

export const TaskForm = () => {
  const { addTask, getTaskById, updateTask,getTasks } = useContext(TaskContext);

  //for edit, hold on to state of task in this view
  const [task, setTask] = useState({});
  //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false)
  const { taskId } = useParams();
  const history = useHistory();

  //when field changes, update state. This causes a re-render and updates the view.
  //Controlled component
  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newTask = { ...task };
    //task is an object with properties.
    //set the property to the new value
    newTask[event.target.name] = event.target.value;
    //update state
    setTask(newTask);
  };

  const handleSaveTask = () => {
        addTask({
          name: task.name,
          completionDate: task.completionDate,
          completed: false
        })
        setShowForm(false)
    }
 
    const handleShowForm = () => {
      setShowForm(true)
    }
  // Get customers and locations. If taskId is in the URL, getTaskById
  useEffect(() => {
    getTasks()
      .then(() => {
        if (taskId) {
          getTaskById(taskId).then((task) => {
            setTask(task);
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  //since state controls this component, we no longer need
  //useRef(null) or ref

  if(showForm === true) {
    return (
       <form className="taskForm">
      <h2 className="taskForm__title">New Task</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="taskName">Task name: </label>
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
          <label htmlFor="taskBreed">Completion Date: </label>
          <input
            type="text"
            id="taskDate"
            name="completionDate"
            required
            autoFocus
            className="form-control"
            placeholder="Completion date"
            onChange={handleControlledInputChange}
            defaultValue={task.completionDate}
          />
        </div>
      </fieldset>
      
      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
          handleSaveTask();
        }}
      >
        Save Task
      </button>
    </form>
    )

  } else {
    return (
      <div>
        <button className="btn btn-primary" onClick={(event)=> {event.preventDefault();handleShowForm()}}>
          Add Task
        </button>
      </div>
    );
  }
   
  
};