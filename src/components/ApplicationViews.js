import React from "react";
import { Route } from "react-router-dom";
import { MessageProvider } from "./Message/MessageProvider"
import { MessageList } from "./Message/MessageList"


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
      </>
  )
}