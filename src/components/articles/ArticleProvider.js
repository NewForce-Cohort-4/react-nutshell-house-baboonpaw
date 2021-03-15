import React, {useState, createContext} from "react"

// the context is imported and used by individual components that need data
export const ArticleContext = createContext()

// this component establishes what data can be used
export const ArticleProvider = (props) => {
  const [articles, setArticles] = useState([])

  const getArticles = () => {
    return fetch("http://localhost:8088/articles")
    .then(res => res.json())
    .then(setArticles)
  }

  const userId = localStorage.getItem("nutshell_user")

  const getArticlesById = (id) => {

    return fetch(`http://localhost:8088/articles/${id}`)
      .then(res => res.json())
  }

  const addArticle = articleObj => {
    return fetch("http://localhost:8088/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articleObj)
    })
    .then(response => response.json())
  } 

  const deleteArticle = articleId => {
    return fetch(`http://localhost:8088/articles/${articleId}`, {
      method: "DELETE"
    })
    .then(getArticles)
  }

  const updateArticle = article => {
    return fetch(`http://localhost:8088/articles/${article.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(article)
    })
    .then(getArticles)
  }

  // you return a context provider which has the articles state, getArticles function. This allows any child elements to access them.
  return (
    <ArticleContext.Provider value={{
      articles, getArticles, addArticle, getArticlesById, deleteArticle, updateArticle
    }}>
      {props.children}
    </ArticleContext.Provider>
  )
}

