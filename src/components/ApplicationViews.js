import React, { Component } from "react";
import { Route } from "react-router-dom";
import { EventList } from "./events/EventsList"
import { EventProvider } from "../components/events/EventProvider"
import { EventForm } from "../components/events/EventForm"

import { TaskForm } from "../components/tasks/TaskForm";
import { TaskList } from "../components/tasks/TaskList";
import { TaskProvider } from "../components/tasks/TaskProvider";
import { MessageProvider } from "./Message/MessageProvider"
import { MessageList } from "./Message/MessageList"

export const ApplicationViews = () => {
  return (
    <>
        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact path="/register" render={props => {
            return null
            // Remove null and return the component which will handle user registration
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <MessageProvider>
            <Route exact path="/messages">
                <MessageList />
            </Route>
        </MessageProvider>
      
      <TaskProvider>
        <Route
          path="/tasks" render={props => {
            return (
            <>
            <TaskForm/> 
            <TaskList />
            </>
            ) 
            
          }}
        />
      </TaskProvider>

      <EventProvider>
        <Route
          path="/events" render={props => {
            return (
            <>
            <EventForm />
            <EventList />
            </>
            )
          }}
        />
      </EventProvider>
      
      </>

  );
 }


