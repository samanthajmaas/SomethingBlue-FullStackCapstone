import React from "react"
import {Route} from "react-router-dom"
import { BrideProvider } from "./brides/BrideProvider"
import { Checklist } from "./checklists/CheckList"
import { ChecklistProvider } from "./checklists/ChecklistProvider"
import { Dashboard } from "./dashboard/Dashboard"
import { WeddingProvider } from "./weddings/WeddingProvider"

export const ApplicationViews = (props) => {
    return (
        <>

        <BrideProvider>
            <WeddingProvider>
                <Route exact path="/" render={
                    props=> <Dashboard {...props} />
                } />
            </WeddingProvider>
        </BrideProvider>
        
        <WeddingProvider>
            <ChecklistProvider>
                <Route exact path="/checklist/wedding/:weddingId(\d+)" render={
                            props=> <Checklist {...props} />
                }/>
            </ChecklistProvider>
        </WeddingProvider>

        <Route exact path="/logout" render={
                (props) => {
                    localStorage.removeItem("blue_user")
                    props.history.push("/login")
                }
            } />
        </>
    )
}