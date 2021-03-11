import React, { useState, useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import { Message } from "./Message"
import { MessageForm } from "./MessageForm"
import "./Message.css"

export const MessageList = () => {
    // retrieve function and array from Provider
    const { getMessages, messages } = useContext(MessageContext)

    // Initialization effect hook -> Go get messages data
    useEffect(()=>{
        getMessages()
    }, [])

    // return list of messages and form
    return (
        <>
            <main> 
                <h1>Messages</h1>
                <div className="messages">
                    {
                        messages.map(message => {
                            return <Message key={message.id} message={message} />})
                    }
                </div>
                <div className="form-container">
                    <MessageForm />
                </div>
            </main>
        </>
    )
}