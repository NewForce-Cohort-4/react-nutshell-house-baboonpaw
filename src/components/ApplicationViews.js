import React from "react";
import { Route } from "react-router-dom";
import { MessageProvider } from "./Message/MessageProvider"
import { MessageList } from "./Message/MessageList"

import { TaskForm } from "../components/tasks/TaskForm";
import { TaskList } from "../components/tasks/TaskList";
import { TaskProvider } from "../components/tasks/TaskProvider";

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
    {/*           
            <Route exact path="/">
                <Home />
            </Route> */}

            {/* Render the animal list when http://localhost:3000/messages */}
            <MessageProvider>
                <Route exact path="/messages">
                    <MessageList />
                </Route>
            </MessageProvider>
            <TaskProvider>
                <Route exact path="/tasks">
                    <TaskForm/> 
                    <TaskList />
                </Route>
            </TaskProvider>
        </>
    )
}



