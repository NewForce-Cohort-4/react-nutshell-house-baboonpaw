import React, {useContext, useState} from "react"
import {ArticleContext} from "./ArticleProvider"
import {useHistory} from "react-router-dom"

export const ArticleForm = () => {
  const {addArticle} = useContext(ArticleContext)

  const history = useHistory()

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

  const handleSaveArticle = (event) => {
    event.preventDefault()

    addArticle(article)
    .then(() => history.push("/articles"))
  }

  return (
    <>
      <form className="articleForm">
        <h2 className="articleForm__title">New Article</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">Article title: </label>
            <input type="text" id="title" name="title" required autoFocus className="form-control" placeholder="Article title" onChange={handleControlledInputChange} defaultValue={article.title}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="synopsis">Synopsis: </label>
            <input type="textarea" id="synopsis" name="synopsis" className="form-control" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">  
            <label htmlFor="url">URL: </label>
            <input type="text" id="url" name="url" className="form-control" onChange={handleControlledInputChange}/>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleSaveArticle}>Save Article</button>
      </form>
    </>
  )
}