import React from "react"
import { Route } from "react-router-dom"
import { BrideProvider } from "./brides/BrideProvider"
import { BudgetList } from "./budgets/BudgetList"
import { BudgetProvider } from "./budgets/BudgetProvider"
import { Checklist } from "./checklists/CheckList"
import { ChecklistProvider } from "./checklists/ChecklistProvider"
import { Dashboard } from "./dashboard/Dashboard"
import { GuestList } from "./guestlists/GuestList"
import { GuestProvider } from "./guestlists/GuestProvider"
import { Nav } from "./nav/Nav"
import { VisionBoard } from "./visionboards/VisionBoard"
import { VisionBoardProvider } from "./visionboards/VisionBoardProvider"
import { WeddingProvider } from "./weddings/WeddingProvider"
import Logo from "./NavLogo.png"

export const ApplicationViews = (props) => {
    return (
        <>
            <img className="logo"
                to="/dashboard"
                onClick={() => {
                    props.history.push("/dashboard")
                }}
                src={Logo} />
            <Nav {...props} />
            <BrideProvider>
                <WeddingProvider>
                    <Route exact path="/dashboard" render={
                        props => <Dashboard {...props} />
                    } />
                </WeddingProvider>
            </BrideProvider>

            
                <WeddingProvider>
                    <ChecklistProvider>
                        <Route exact path="/checklist" render={
                            props => <Checklist {...props} />
                        } />
                    </ChecklistProvider>
                </WeddingProvider>


            <WeddingProvider>
                <BudgetProvider>
                    <Route exact path="/budget" render={
                        props => <BudgetList {...props} />
                    } />
                </BudgetProvider>
            </WeddingProvider>

            <WeddingProvider>
                <VisionBoardProvider>
                    <Route exact path="/visionboard" render={
                        props => <VisionBoard {...props} />
                    } />
                </VisionBoardProvider>
            </WeddingProvider>

            <GuestProvider>
                <Route exact path="/guests" render={
                    props => <GuestList {...props} />
                } />
            </GuestProvider>
        </>
    )
}