import React from "react"

export const ArticleCard = ({article}) => (
  <section className="article">
    <h3 className="article__title">{article.title}</h3>
    <p className="article__synopsis">{article.synopsis}</p>
    <p className="article__url">{article.url}</p>
  </section>
)