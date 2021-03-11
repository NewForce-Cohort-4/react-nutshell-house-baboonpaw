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

  const addArticle = articleObj => {
    return fetch("http://localhost:8088/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articleObj)
    })
    .then(getArticles)
  } 

  // you return a context provider which has the articles state, getArticles function. This allows any child elements to access them.
  return (
    <ArticleContext.Provider value={{
      articles, getArticles, addArticle
    }}>
      {props.children}
    </ArticleContext.Provider>
  )
}

