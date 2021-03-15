import React, {useContext, useEffect, useState} from "react"
import {ArticleContext} from "./ArticleProvider"
import {useParams, useHistory} from "react-router-dom"

export const ArticleDetails = () => {
  const {getArticlesById} = useContext(ArticleContext)

  const [article, setArticle] = useState({})
  const {articleId} = useParams()
  const history = useHistory()

  useEffect(() => {
    console.log("useEffect", articleId)
    getArticlesById(articleId)
    .then((response) => {
      setArticle(response)
    })
  }, [])

  return (
    <section className="article">
      <h3 className="article__title">{article.title}</h3>
      <p className="article__synopsis">{article.synopsis}</p>
      <p className="article__url">{article.url}</p>
    </section>
  )
}