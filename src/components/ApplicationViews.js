import React from "react";
import { Route } from "react-router-dom";
import {ArticleList} from "./articles/ArticleListView"
import {ArticleProvider} from "./articles/ArticleProvider"
import {ArticleForm} from "./articles/ArticleSaveForm"
import {ArticleDetails} from "./articles/ArticleDetails"
import { MessageProvider } from "./Message/MessageProvider"
import { MessageList } from "./Message/MessageList"
import { TaskForm } from "./tasks/TaskForm";
import { TaskList } from "./tasks/TaskList";
import { TaskProvider } from "./tasks/TaskProvider";

export const ApplicationViews = () => {
  return (
    <>
      <ArticleProvider>
        <Route exact path="/articles">
          <ArticleList />
        </Route>
        <Route exact path="/articles/create">
          <ArticleForm />
        </Route>
        <Route exact path="/articles/edit/:articleId(\d+)">
          <ArticleForm />
        </Route>
        <Route exact path="/articles/detail/:articleId(\d+)">
          <ArticleList />
          <ArticleDetails />
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




