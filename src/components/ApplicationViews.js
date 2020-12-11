import React from "react"
import {Link, Route} from "react-router-dom"

export const ApplicationViews = (props) => {
    return (
        <>
        <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("blue_user")
                    props.history.push("/login")
                }
            } />
        </>
    )
}