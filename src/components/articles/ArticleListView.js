
// A list component. Lists the articles saved in a user's account to view in the dashboard. Each article has a delete button that removes the article. Imports module to fetch and copy all the articles on the server for a user's account and the module to delete them

// Aaron Frankenfield

import React, {useContext, useEffect} from "react"
import {ArticleContext} from "./ArticleProvider"
import {ArticleCard} from "./ArticleCard"
import {useHistory} from "react-router-dom"

export const ArticleList = () => {
  // This state changes when getArticles is invoked below
  const {articles, getArticles} = useContext(ArticleContext)

  const history = useHistory()

  // useEffect - empty dependency array - useEffect only runs after first render
  useEffect(() => {
    console.log("ArticleList: useEffect - getArticles")
    getArticles()
  }, [])

  return (
    <>
      <h2>Articles</h2>
        {console.log("AnimalList: Render", articles)}
        {
          articles.map(article => {
            console.log(article)
            return <ArticleCard key={article.id} article={article} />
          })
        }
      <button onClick={() => {history.push("/articles/create")}}>
        New Article
      </button>
    </>
  )

}
