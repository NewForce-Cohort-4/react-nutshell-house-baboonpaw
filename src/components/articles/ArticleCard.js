import React from "react"
import "./Articles.css"

export const ArticleCard = ({article, deleteFn, editFn}) => {
  return (
    <section className="article-card">
      <h3 className="article__title">{article.title}</h3>
      <p className="article__synopsis">{article.synopsis}</p>
      <p className="article__url">{article.url}</p>
      <button onClick={deleteFn}>Delete Article</button>
      <button onClick={editFn}>Edit Article</button>
    </section>
  )
}

