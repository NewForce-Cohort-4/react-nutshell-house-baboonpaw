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
import {ArticleList} from "./articles/ArticleListView"
import {ArticleProvider} from "./articles/ArticleProvider"
import {ArticleForm} from "./articles/ArticleSaveForm"

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
      
      <ArticleProvider>
        <Route exact path="/articles">
          <ArticleList />
        </Route>
        <Route exact path="/articles/create">
          <ArticleForm />
        </Route>
      </ArticleProvider>
      {/* Render the animal list when http://localhost:3000/messages */}
      <MessageProvider>
        <Route exact path="/messages">
          <MessageList />
        </Route>
      </MessageProvider>
      <TaskProvider>
        <Route exact path="/tasks">
          <TaskList />
          <TaskForm />
        </Route>
      </TaskProvider>
    </>
  );
}  




