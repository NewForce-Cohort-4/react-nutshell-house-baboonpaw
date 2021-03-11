import { Route } from "react-router-dom";
import React, { Component } from "react";
import { EventList } from "./events/EventsList"
import { EventCard } from "./events/Events";
import { EventProvider } from "../components/events/EventProvider"
import { EventForm } from "../components/events/EventsForm"

import { TaskForm } from "../components/tasks/TaskForm";
import { TaskList } from "../components/tasks/TaskList";
import { TaskProvider } from "../components/tasks/TaskProvider";
export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

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

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />
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
            <EventList />
            <EventForm />
            </>
            )
          }}
        />
      </EventProvider>
      </React.Fragment>
    );
  }
}
