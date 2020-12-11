import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Blue.css"
import { BrideProvider } from "./brides/BrideProvider"


export const Blue = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("blue_token")) {

                return (
                    <>
                    <BrideProvider>
                        <Route render={props =>
                            <ApplicationViews
                            {...props}  />} />

                    </BrideProvider>
                    </>
                )
            }
            else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={(props) => {
            if (localStorage.getItem("blue_token")) {
                return <Redirect to="/blue" />
            } else {
                return (
                <>
                <BrideProvider>
                    <Login {...props} />
                </BrideProvider>
                </>
                )
            }
        }} />

        <BrideProvider>
            <Route path="/register" render={(props) => {
                if (localStorage.getItem("blue_token")) {
                    return <Redirect to="/blue" />
                }
                else {
                    return <Register {...props}/>
                }
            }} />
        </BrideProvider>
    </>
)
