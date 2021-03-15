import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "./EventProvider";
import "./Events.css"
import { useHistory, useParams } from 'react-router-dom';

export const EventForm = () => {
    const { addEvent, getEvents, getEventById } = useContext(EventContext)

    //Define the intial state of the form inputs with useState()

    const [event, setEvent] = useState({}); 
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false)
    const { eventId } = useParams()
    const history = useHistory();

      /*
    Reach out to the world and get customers state
    and locations state on initialization.
    */
    useEffect(() => {
       getEvents()
       .then(() => {
           if (eventId) {
               getEventById(eventId)
               .then((event) => {
                   setEvent(event);
                   setIsLoading(false);
               });
           } else {
               setIsLoading(false)
           }
       });
     }, [])

      //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (e) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newEvent = { ...event }
        /* event is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newEvent[e.target.id] = e.target.value
        // update state
        setEvent(newEvent)
    }

    const handleSaveEvent = () => {
        addEvent({
        name: event.name,
        date: event.date,
        location: event.location
    }).then(() => {
      setShowForm(false);
    });
    };

    const handleClickSaveEvent = () => {
          if (event.name && event.date && event.location){
              addEvent({
                  id: showForm,
                  name: event.name,
                  date: event.date,
                  location: event.location
              });
              setShowForm(false);
              setEvent({})
              
          }
          else{
            //invoke addEvent passing events as an argument.
            //once complete, change the url and display the event list
            addEvent(event)
          .then(() => history.push("/events"))
          }
      
    }
    
    const handleShowForm = () => {
        setShowForm(true)
      }

    if(showForm === true) {
      return (
        <form className="eventForm">
            <h2 className="eventForm__title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Event name" value={event.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Date" value={event.date}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Location: </label>
                    <input type="text" id="location" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location" value={event.location}/>
                </div>
            </fieldset>
            
            <button className="btn btn-primary"
              disabled={isLoading}
              onClick={(event) => {
                  event.preventDefault();
                  handleSaveEvent();
              }}>
                Save Event
            </button>
        </form>
      );
    } 
    else {
        return (
            <div>
                <button className ="btn btn-primary" 
                onClick={(event) => {
                    event.preventDefault();
                    handleShowForm();
                }}>
                    Add Event
                </button>
            </div>
        )
    }

}