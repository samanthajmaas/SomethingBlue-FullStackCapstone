import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Blue.css"
import { BrideProvider } from "./brides/BrideProvider"
import { WeddingProvider } from "./weddings/WeddingProvider"


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
                return <Redirect to="/dashboard" />
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
        <WeddingProvider>
            <BrideProvider>
                <Route path="/register" render={(props) => {
                    if (localStorage.getItem("blue_token")) {
                        return <Redirect to="/dashboard" />
                    }
                    else {
                        return <Register {...props}/>
                    }
                }} />
            </BrideProvider>
        </WeddingProvider>
    </>
)
