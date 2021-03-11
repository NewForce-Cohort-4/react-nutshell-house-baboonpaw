import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "./EventProvider";
import "./Events.css"
import { useHistory, useParams } from 'react-router-dom';

export const EventForm = () => {
    const { addEvent } = useContext(EventContext)

    //Define the intial state of the form inputs with useState()

    const [events, setEvents] = useState({
        name: "",
        date: "",
        location: ""
      }); 

      const { eventId } = useParams()
      const history = useHistory();

      /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
    useEffect(() => {
        getEvents()
      }, [])

      //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newEvent = { ...event }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newEvent[event.target.id] = event.target.value
        // update state
        setEvents(newEvent)
    }

    const handleClickSaveEvent = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

          //invoke addEvent passing event as an argument.
          //once complete, change the url and display the event list
          if ( eventId ){
              addEvent({
                  name: event.name,
                  date: event.date,
                  location: event.location
              })
          .then(() => history.push("/events"))
          }
      }

      return (
        <form className="eventForm">
            <h2 className="eventForm__title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Event name" value={events.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date" value={events.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Location: </label>
                    <input type="text" id="location" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location" value={events.location}/>
                </div>
            </fieldset>
            <button className="btn btn-primary"
              disabled={isLoading}
              onClick={event => {
                  event.preventDefault()
                  handleClickSaveEvent()
              }}>
                {<>Save Employee</> : <>Add Employee</>}
            </button>
        </form>
      )

}