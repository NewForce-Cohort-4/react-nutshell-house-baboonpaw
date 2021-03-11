import React, {useContext, useEffect, useState} from "react"
import {ArticleContext} from "./ArticleProvider"
import {useHistory, useParams} from "react-router-dom"

export const AnimalForm = () => {
  const {addAnimal, updateAnimal} = useContext(AnimalContext)

  const {animalId} = useParams()
  const history = useHistory()

  // when field changes, update state. this causes a re-render and updates the view.
  // controlled component
  const handleControlledInputChange = (event) => {
    // when changing a state object or array
    // always create a copy, make changes, and then set state
    const newArticle = {...article}
    // article is an object with properties
    // set the property to the new value
    newArticle[event.target.name] = event.target.value
    // update state
    setArticle(newArticle)
  }

  const handleSaveArticle = () => {

  }

  return (
    <form className="articleForm">
      <h2 className="articleForm__title">New Article</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="articleTitle">Article title: </label>
          <input type="text" id="articleTitle" name="name" required autoFocus className="form-control" placeholder="Article title" onChange={handleControlledInputChange} defaultValue={article.title}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="articleSynopsis">Synopsis: </label>
          <input type="textarea" id="articleSynopsis" name="articleSynopsis" className="form-control" onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">  
          <label htmlFor="articleUrl">URL: </label>
          <input type="text" id="articleUrl" name="articleUrl" className="form-control" onChange={handleControlledInputChange}/>
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleSaveArticle}></button>
    </form>
  )
}