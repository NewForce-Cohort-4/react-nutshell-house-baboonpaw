import React from "react"
import "./Message.css"
// import { Link } from "react-router-dom"

// Create component "Message" to generate JSX using provided message parameter
export const Message = ({ message }) => {
    console.log(message)
    return (
        <>
            <p>
                <strong>{message.user.firstName}: </strong>{message.message}
            </p>
        </>
    )
}