
// A list component. Lists the articles saved in a user's account to view in the dashboard. Each article has a delete button that removes the article. Imports module to fetch and copy all the articles on the server for a user's account and the module to delete them

// Aaron Frankenfield

import React, {useContext, useEffect, useState} from "react"
import {ArticleContext} from "./ArticleProvider"
import {ArticleCard} from "./ArticleCard"
import {useHistory} from "react-router-dom"

export const ArticleList = () => {
  // This state changes when getArticles is invoked below
  const {articles, getArticlesById, deleteArticle, updateArticle} = useContext(ArticleContext)
  const [filteredArticles, setFiltered] = useState([])

  const history = useHistory()

 

  // useEffect - empty dependency array - useEffect only runs after first render
  useEffect(() => {
    console.log("ArticleList: useEffect - getArticles")
    getArticlesById()
    console.log(getArticlesById)
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
    <>
      <h2>Articles</h2>
        {console.log("AnimalList: Render", articles)}
        {
            filteredArticles.map(article => {
              console.log(article)
              return (<ArticleCard key={article.id} article={article} deleteFn={handleDeletion(article.id)} editFn={handleEdit(article.id)}
                /> )
              })
        }
          
      <button onClick={() => {history.push("/articles/create")}}>
        New Article
      </button>
    </>
  )
}
