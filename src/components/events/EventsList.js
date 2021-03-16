//Author: Sophia Spaulding

import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { boldEvent, EventCard } from "./Events"
import { useHistory } from 'react-router-dom';
import "./Events.css"

export const EventList = () => {
  // This state changes when `getEvents()` is invoked below
  const { events, getEvents, updateEvent, getEventById } = useContext(EventContext)
  const [event, setEvent] = useState({}); 
  const [editEventId, setEditEventId] = useState(0);
  //useEffect - reach out to the world for something
  useEffect(() => {
    // console.log("EventList: useEffect - getEvents")
    getEvents()
  }, [])
  
  
  const handleEditEvent = () => {
    updateEvent({
        id: editEventId,
        name: event.name,
        date: event.date,
        location: event.location
    })
    .then(() => {
      setEditEventId(0)
});
}

  return (
      <>

    <div className="events">
    <button className="btn btn-primary"
            //disabled={isLoading}
            onClick={(event) => {
            setEditEventId(event.id);
            getEventById(event.id).then((event) => {
              setEvent(event)
            })

              }}>
            Edit Event
            </button>
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
