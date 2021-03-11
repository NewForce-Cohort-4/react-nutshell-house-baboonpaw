import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./Events"
import { useHistory } from 'react-router-dom';
import "./Events.css"

export const EventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext)
  const history = useHistory()
  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EventList: useEffect - getEvents")
    getEvents()

  }, [])

  return (
      <>
        <h2>Events</h2>
        <button onClick={() => {history.push("/events/create")}}>
            Add Event
        </button>
    <div className="events">
      {console.log("EventList: Render", events)}
      {events.map(event => {
         console.log(event)
         return <EventCard key={event.id} event={event} />
        })
      }
    </div>
    </>
  )
}