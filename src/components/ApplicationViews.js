import { Route } from "react-router-dom";
import React from "react";
import {ArticleList} from "./articles/ArticleListView"
import {ArticleProvider} from "./articles/ArticleProvider"

export const ApplicationViews = () => {

 
    return (
      <>

        <ArticleProvider>
          <Route exact path="/articles">
            <ArticleList />
          </Route>
        </ArticleProvider>

      </>
    )
  
}
