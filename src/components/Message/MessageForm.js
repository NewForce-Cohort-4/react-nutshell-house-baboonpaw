import React, { useState, useContext } from "react"
import { MessageContext } from "./MessageProvider"
import "./Message.css"

// Create "MessageForm" component to generate a new message field such that USER can add a new message to the public forum
export const MessageForm = ({existingMessage, setEditMessageId}) => {
    // import functions from MessageProvider.js
    const { addMessage, getMessages, editMessage } = useContext(MessageContext)

    // Set initial State
    const [message, setMessage] = useState(existingMessage);

    // Declare a function which will monitor typing events in the new message input and update State
    const handleControlledInputChange = (event) => {

        // Make a copy of State
        const newMessage = { ...message }
       
        // Set message.message = newly typed value
        newMessage[event.target.id] = event.target.value

        // Update State
        setMessage(newMessage)
    }

    // Declare function to save new message, update message list, and clear the form input.
    const handleClickSaveMessage = (event) => {
        //Prevent the browser from submitting the form
        event.preventDefault() 

        if (message.id) {
            editMessage(message)
            .then(setEditMessageId(0))
        }
        else {
            //Save the new message by invoking addMessage passing message as an argument.
            addMessage(message)
            //once saved, reset State to the default
            .then(() => {
                const defaultMessage = {
                    message: "",
                    userId: +(localStorage.getItem("nutshell_user"))
                }
                setMessage(defaultMessage)
            })
            .then(getMessages)
        }
    }
  
    // return the JSX form
    return (
        <>
            <form>
                <fieldset className="messageForm">
                    <div className="form-group">
                        <input type="text" id="message" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="New message..." value={message.message}/>
                    </div>
                    <div className="btn-container">
                        <button className="btn btn-primary" onClick={event => {event.preventDefault(); handleClickSaveMessage(event)}}>
                            +
                        </button>
                    </div>
                </fieldset>
            </form>
        </>
    )
}


