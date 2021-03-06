
// A list component. Lists the articles saved in a user's account to view in the dashboard. Each article has a delete button that removes the article. Imports module to fetch and copy all the articles on the server for a user's account and the module to delete them

// Aaron Frankenfield

import React, {useContext, useEffect, useState} from "react"
import {ArticleContext} from "./ArticleProvider"
import {ArticleCard} from "./ArticleCard"
import {useHistory} from "react-router-dom"
import "./Articles.css"

export const ArticleList = () => {
  // This state changes when getArticles is invoked below
  const {articles, getArticles, getArticlesById, deleteArticle, updateArticle} = useContext(ArticleContext)
  // since you are no longer always displaying all of the articles
  const [filteredArticles, setFiltered] = useState([])
  const history = useHistory()

  // useEffect - empty dependency array - useEffect only runs after first render
  useEffect(() => {
    console.log("ArticleList: useEffect - getArticles")
    getArticles()
    console.log(getArticles)
  }, [])

  useEffect(() => {
    const sortArticles = articles.sort((a,b) => b.time - a.time)
    setFiltered(sortArticles)
  }, [articles])
  
  const handleDeletion = (articleId) => {
    return () => deleteArticle(articleId).then(() =>
    history.push("/articles"))
  }

  const handleEdit = (articleId) => {
    return () => history.push(`/articles/edit/${articleId}`)
  }

  return (
    <div className="articles-tab">
      <h1 className="title">Articles</h1>
      <div className="articles">
        {console.log("AnimalList: Render", articles)}
        {
            filteredArticles.map(article => {
              console.log(article)
              return (<ArticleCard key={article.id} article={article} deleteFn={handleDeletion(article.id)} editFn={handleEdit(article.id)} 
                /> )
              })
        }
      </div>  
      <button className="btn btn-primary" onClick={() => {history.push("/articles/create")}}>
        New Article
      </button>
    </div>
  )
}
