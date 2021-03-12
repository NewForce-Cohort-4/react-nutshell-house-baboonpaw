import React, { useContext, useEffect, useState } from "react"
import { MessageContext } from "./MessageProvider"
import "./Message.css"
// import { Link } from "react-router-dom"

// Create component "Message" to generate JSX using provided message parameter
export const Message = ({ message }) => {

    const {deleteMessage, editMessage} = useContext(MessageContext)
    const {selectedMessage, setMessage} = useState({})

    const handleControlledInputChange = (event) => {
        console.log(event.target.value)
        if (+event.target.value === 1) {
            console.log("This will delete the message.")

        } else if (+event.target.value === 2) {
            console.log("This will edit the message.")

        }
    }
    console.log(message)
    return (
    <div className="message">
        <p>
            <strong>{message.user.firstName}: </strong>{message.message}
        </p>
        <fieldset>
            <div className="form-group">
                <label htmlFor="message" hidden>Select an option: </label>
                <select name="modifyMessage" id="modifyMessage-"{message.id} className="form-control" onChange={handleControlledInputChange}>
                    <option value="0">...</option>
                    <option value="1">Delete</option>
                    <option value="2">Edit</option>
                </select>
            </div>
        </fieldset>
    </div>
)}