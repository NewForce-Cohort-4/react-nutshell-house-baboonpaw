import React from "react"
import "./Message.css"
// import { Link } from "react-router-dom"

// Create component "Message" to generate JSX using provided message parameter
export const Message = ({ message, setEditMessageId }) => {

    const componentJSX = () => {
        return (
                <p>
                    <strong>{message.user.firstName}: </strong>{message.message}
                </p>
        )
    }

    if (message.userId === +localStorage.getItem("nutshell_user")) {
        return (
            <div className = "message-container">
                <div className="buffer"></div>
                <div className="user-message flex-container-inLine">
                    {componentJSX()}
                    <div className="edit-button-container">
                        <button className="edit-button btn btn-secondary btn-sm" id={message.id} onClick={event => {event.preventDefault(); setEditMessageId(+event.target.id)}}>
                            ...
                        </button>
                    </div>
                </div>
            </div>
        )
    } 
    else if (message.userId !== +localStorage.getItem("nutshell_user")) {
        return (
            <div className = "message-container">
                <div className="other-message flex-container-inLine">
                    {componentJSX()}
                </div>
                <div className="buffer"></div>
            </div>
        )
    }
    
}
