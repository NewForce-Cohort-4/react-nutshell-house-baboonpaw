import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const MessageContext = createContext()

// The MessageProvider component establishes what data can be used.
export const MessageProvider = (props) => {
    const [messages, setMessages] = useState([])

    // getMessages retrieves data from the API
    const getMessages = () => {
        return fetch("http://localhost:8088/messages?_expand=user")
        .then(res => res.json())
        // use the array method .reverse() to flip the array. This is needed due to the CSS manipulation of the message list container in order to force a scrolling container which loads the most recent messages to the bottom.
        .then(dataArray => {
            setMessages(dataArray.reverse())
        })
    }

    // const getMessageById = (id) => {
    //     return fetch(`http://localhost:8088/messages/${id}?_expand=user`)
    //         .then(res => res.json())
    // }

    // addMessage posts new data to the API
    const addMessage = messageObj => {
        return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then(response => response.json())
    }
    
    // deleteMessage removes existing data from the API
    const deleteMessage = messageId => {
        return fetch(`http://localhost:8088/messages/${messageId}`, {
            method: "DELETE"
        })
            .then(getMessages)
    }

    // editMessage puts updated data into an existing data object in the API
    const editMessage = message => {
        return fetch(`http://localhost:8088/messages/${message.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(message)
        })
          .then(getMessages)
      }

    /*
        return a context provider which has the
        `messages` state, `getMessages`, `addMessage`, `deleteMessage`, and `editMessage` functions as keys. This
        allows any child elements to access them.
    */
    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, deleteMessage, editMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}