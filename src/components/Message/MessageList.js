import React, { useState, useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import { Message } from "./Message"
import { MessageForm } from "./MessageForm"
import "./Message.css"

export const MessageList = () => {
    // retrieve function and array from Provider
    const { messages, getMessages, editMessage, deleteMessage } = useContext(MessageContext)
    const [EditMessageId, setEditMessageId] = useState(0)

    // Initialization effect hook -> Go get messages data
    useEffect(()=>{
        getMessages()
    }, [])


    // const handleControlledInputChange = (event) => {

    //     // Make a copy of State
    //     const newMessage = { ...message }
       
    //     // Set message.message = newly typed value
    //     newMessage[event.target.id] = event.target.value

    //     // Update State
    //     setMessage(newMessage)
    // }

    // const handleClickModify = (event) => {
    //     console.log(event.target.value)

        
    //     // if (+event.target.value === 1) {
    //     //     console.log("This will delete the message.")
    //     //     deleteMessage(+event.target.id)
    //     // } else if (+event.target.value === 2) {
    //     //     console.log("This will edit the message.")
    //     //     // need to present an in-line form, update state, then update database
    //     //     editMessage(+event.target.id)
    //     // }

    // }

    // return list of messages and form
    return (
        <>
            <main> 
                <h1>Messages</h1>
                <div className="messages">
                    {
                        messages.map(message => {
                            // console.log(typeof message.userId)
                            // console.log(typeof localStorage.getItem("nutshell_user"))
                            if (EditMessageId === message.id) {
                                // setEditMessageId(0)
                                return <MessageForm />
                            }
                            else if (message.userId === +localStorage.getItem("nutshell_user")) {
                                return (
                                <>
                                <div key={message.id} className="message flex-container-inLine">
                                    <Message message={message} />
                                    <div>
                                        <button className="btn btn-secondary btn-sm" id={message.id} onClick={event => {event.preventDefault(); setEditMessageId(+event.target.id)}}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                </>
                                )
                            } 
                            else if (message.userId !== +localStorage.getItem("nutshell_user")) {
                                return (
                                    <Message key={message.id} message={message} />
                                )
                            }
                        })
                    }
                </div>
                <div className="form-container">
                    <MessageForm />
                </div>
            </main>
        </>
    )
}

/*
<fieldset className="modifyMessage">
                                        <div className="form-group">
                                            <label htmlFor="message" hidden>Select an option: </label>
                                            <select name="modifyMessage" id={message.id} className="form-control" onChange={() => {
                                                setMessage(message);handleClickModify()}}>
                                                <option value="0">...</option>
                                                <option value="1">Delete</option>
                                                <option value="2">Edit</option>
                                            </select>
                                        </div>
                                    </fieldset>
                                    */