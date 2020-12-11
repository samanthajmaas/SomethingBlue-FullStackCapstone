import React from "react"
import {Link, Route} from "react-router-dom"
import { BrideProvider } from "./brides/BrideProvider"
import { Dashboard } from "./dashboard/Dashboard"
import { WeddingProvider } from "./weddings/WeddingProvider"

export const ApplicationViews = (props) => {
    return (
        <>

        <BrideProvider>
            <WeddingProvider>
                <Route path="/blue" render={
                    props=> <Dashboard {...props} />
                } />
            </WeddingProvider>
        </BrideProvider>
        {/* <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("blue_user")
                    props.history.push("/login")
                }
            } /> */}
        </>
    )
}