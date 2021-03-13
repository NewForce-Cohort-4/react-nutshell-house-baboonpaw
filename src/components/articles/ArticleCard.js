import React from "react"

export const ArticleCard = ({article, deleteFn, editFn}) => {
  return (
  <section className="article">
    <h3 className="article__title">{article.title}</h3>
    <p className="article__synopsis">{article.synopsis}</p>
    <p className="article__url">{article.url}</p>
    <p>{new Date(article.time).toLocaleDateString('en-US')}</p>
    <button onClick={deleteFn}>Delete Article</button>
    <button onClick={editFn}>Edit Article</button>
  </section>
  )
}

