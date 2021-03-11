import React, { useContext, useEffect, useState } from "react";
import { render } from "react-dom";
import {TaskContext} from "./TaskProvider"

export const Task = ({ task }) => 
(
  <section className="task">
    <h3 className="task__name">{task.name}</h3>
    <div className="task_date">
      <strong>Completion Date:</strong> {task.completionDate}
    </div>
  </section>
  )

