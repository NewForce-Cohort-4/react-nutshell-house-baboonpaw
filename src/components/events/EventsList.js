import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { boldEvent, EventCard } from "./Events"
import { useHistory } from 'react-router-dom';
import "./Events.css"

export const EventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents } = useContext(EventContext)
  
  //useEffect - reach out to the world for something
  useEffect(() => {
    // console.log("EventList: useEffect - getEvents")
    getEvents()
  }, [])

  return (
      <>
    <div className="events">
      {/* {console.log("EventList: Render", events)} */}
      {/* <boldEvent key={events[0].id} event = {events[0]}/> */}
      {events.map((event, index) => {
        let styleclass = "reguler"
        if(index === 0) {
          styleclass = "boldEvent" 
        }
        //  console.log(event)
         return <EventCard key={event.id} event={event} styleclass={styleclass} />
        })
      }
    </div>
    </>
  )
}
