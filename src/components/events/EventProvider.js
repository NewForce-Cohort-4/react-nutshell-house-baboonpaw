// This is the provider component that fetches any saved articles from the user's account and displays them to the dom. It will also save new articles and delete any saved articles. 
// Author: Sophia Spaulding


//This code imports the main React library, and two functions that it exports.
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const EventContext = createContext()

// This component establishes what data can be used.
export const EventProvider = (props) => {
     //defines a variable that holds the state of the componant, and a function that updates it.
     const [events, setEvents] = useState([])//analagous to empty array in vanilla js; setEvents reassigns that empty array; only setArticles can modify "events"
    
    // you need some functions that perform state transitions in your database, and then ensure that the application state stays in sync.
    const getEvents = () => {
        return fetch("http://localhost:8088/events")
        .then(res => res.json())
        
        .then(setEvents)
    }

    const addEvent = eventObj => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObj)
        })
        .then(getEvents)
    }

    return (
        <EventContext.Provider value={{ //.provider is a property that runs on the AnimalContext
            events, getEvents, addEvent //like the toolbelt for the provider - all the things listed are what the provider is capable of 
        }}>
            {props.children}
        </EventContext.Provider>
    )
}