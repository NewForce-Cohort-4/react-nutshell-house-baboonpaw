import React, {useContext, useState, useEffect} from "react"
import {ArticleContext} from "./ArticleProvider"
import {useHistory, useParams} from "react-router-dom"

export const ArticleForm = () => {
  const {addArticle, getArticlesById, updateArticle} = useContext(ArticleContext)

  const history = useHistory()

  // for edit, hold on to the state of article in this view
  // const [editArticle, setEditArticle] = useState({})

  // wait for data before button is active
  const [isLoading, setIsLoading] = useState(true)

  const {articleId} = useParams()

  // define the initial state of the form inputs with useState()
  const [article, setArticle] = useState({
    title: "",
    synopsis: "",
    url: "",
    time: parseInt(Date.now()),
    userId: parseInt(localStorage.getItem("nutshell_user"))
  })

  // when field changes, update state. this causes a re-render and updates the view.
  // controlled component
  const handleControlledInputChange = (event) => {
    // when changing a state object or array
    // always create a copy, make changes, and then set state
    const newArticle = {...article}
    // article is an object with properties
    // set the property to the new value
    newArticle[event.target.id] = event.target.value
    // update state
    setArticle(newArticle)
  }

  const handleSaveArticle = () => {
    if (article.title === "") {
      window.alert("Please add a title")
    } else if (article.synopsis === "") {
      window.alert("Please add a synopsis")
    } else if (article.url === "") {
      window.alert("Please add a url")
    } else {
        setIsLoading(true)
        if (articleId) {
        // PUT - update
        updateArticle({
          id: article.id,
          title: article.title,
          synopsis: article.synopsis,
          url: article.url
        })
        .then(() => history.push(`/articles/edit/${article.id}`))
      } else {
        // POST - add
        addArticle(article)
        .then(() => history.push("/articles"))
      }
    }
  }

  useEffect(() => {
    if (articleId) {
      getArticlesById(articleId)
      .then(article => {
        setArticle(article)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <form className="articleForm">
      <h2 className="articleForm__title">New Article</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Article title: </label>
          <input type="text" id="title" name="title" required autoFocus className="form-control" placeholder="Article title" onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="synopsis">Synopsis: </label>
          <input type="textarea" id="synopsis" name="synopsis" required className="form-control" onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">  
          <label htmlFor="url">URL: </label>
          <input type="url" id="url" name="url" className="form-control" required onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <button className="btn btn-primary" disabled={isLoading} onClick={event => {
        event.preventDefault()
        handleSaveArticle()
      }}>
      {articleId ? <>Save Article</> : <>Add Article</>}</button>
    </form>
  )
}