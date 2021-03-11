import { LoginForm } from "./LoginForm.js"
import { RegisterForm } from "./RegisterForm.js"

const eventHub = document.querySelector(".auth--logout")
const contentTarget = document.querySelector(".auth--logout")

export const LogOutButton = () => {
    contentTarget.innerHTML = `<button id="logout-button">Log Out</button>`
}

eventHub.addEventListener("click", (eventObject) => {
    if(eventObject.target.id === "logout-button"){
        // clear session storage
        sessionStorage.clear()

        // If you want to clear the DOM when you log out, select individual containers here and set their innerHTML property to an empty string
        document.querySelector("#articles").innerHTML = ""
        document.querySelector("#messages").innerHTML = ""
        document.querySelector("#tasks").innerHTML = ""
        document.querySelector("#events").innerHTML = ""
        // document.querySelector("#message-list").innerHTML = ""


        // This will clear the logout button from the DOM-- you'd just have to do this individually for any other containers you add
        contentTarget.innerHTML = ""


        // Reprint the login and register form
        LoginForm()
        RegisterForm()
    }
})