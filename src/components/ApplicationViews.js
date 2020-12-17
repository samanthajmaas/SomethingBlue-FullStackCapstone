import React from "react"
import {Route} from "react-router-dom"
import { BrideProvider } from "./brides/BrideProvider"
import { BudgetList } from "./budgets/BudgetList"
import { BudgetProvider } from "./budgets/BudgetProvider"
import { Checklist } from "./checklists/CheckList"
import { ChecklistProvider } from "./checklists/ChecklistProvider"
import { Dashboard } from "./dashboard/Dashboard"
import { GuestList } from "./guestlists/GuestList"
import { GuestProvider } from "./guestlists/GuestProvider"
import { VisionBoard } from "./visionboards/VisionBoard"
import { VisionBoardProvider } from "./visionboards/VisionBoardProvider"
import { WeddingProvider } from "./weddings/WeddingProvider"

export const ApplicationViews = (props) => {
    return (
        <>

        <BrideProvider>
            <WeddingProvider>
                <Route exact path="/dashboard" render={
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

        <WeddingProvider>
            <BudgetProvider>
                <Route exact path="/budget/wedding/:weddingId(\d+)" render={
                            props=> <BudgetList {...props} />
                }/>
            </BudgetProvider>
        </WeddingProvider>

        <WeddingProvider>
            <VisionBoardProvider>
                <Route exact path="/visionboard/wedding/:weddingId(\d+)" render={
                            props=> <VisionBoard {...props} />
                }/>
            </VisionBoardProvider>
        </WeddingProvider>

        <GuestProvider>
            <Route exact path="/guests" render={
                        props=> <GuestList {...props} />
            }/>
        </GuestProvider>


        {/* <Route exact path="/logout" render={
                (props) => {
                    localStorage.removeItem("blue_user")
                    props.history.push("/login")
                }
            } /> */}
        </>
    )
}