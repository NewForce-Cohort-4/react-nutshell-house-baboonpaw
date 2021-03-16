import React, { useState, useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import { Message } from "./Message"
import { MessageForm } from "./MessageForm"
import "./Message.css"

export const MessageList = () => {
    // retrieve function and array from Provider
    const { messages, getMessages, deleteMessage } = useContext(MessageContext)
    const [EditMessageId, setEditMessageId] = useState(0)

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

                            if (EditMessageId === message.id) {
                                // setEditMessageId(0)
                                return <MessageForm key={message.id} existingMessage={message} setEditMessageId={setEditMessageId} />
                            }
                            
                            return <Message key={message.id} message={message} setEditMessageId={setEditMessageId}/>
                        })
                    }
                </div>
                <div className="form-container">
                    <MessageForm existingMessage={{message: "", userId:+localStorage.getItem("nutshell_user")}} />
                </div>
            </main>
            
        </>
    )
}
