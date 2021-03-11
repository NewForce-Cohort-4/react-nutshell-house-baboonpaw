import React from "react"
import "./Events.css"

//individual representation for each event
export const EventCard = ({ event }) => (
    <section className="event">
        <div className="event__name">{event.name}</div>
        <div className="event__date">{event.date}</div>
        <div className="event__location">{event.location}</div>
    </section>
    
)
// representation for the first event a user has, shows it's signifigance by using bold tags and header tags
export const boldEvent = ({ event }) => (
    <section>
        <div className="event__date">{event.date}</div>
        <div className="event">{event.event}</div>
        <div className="event__location">{event.location}</div>
    </section>
    
)