import React, { useContext, useEffect, useState } from "react"
import { WeddingContext } from "../weddings/WeddingProvider"

export const BudgetContext = React.createContext()

export const BudgetProvider = (props) => {

    const [budgetItems, setBudgetItems] = useState([])
    const {currentWedding, getCurrentWedding} = useContext(WeddingContext)

    useEffect(() => {
        getCurrentWedding()
    }, [])

    const getBudgetItems = (weddingId) => {
        return fetch(`http://localhost:8000/budget?wedding=${weddingId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setBudgetItems)
    }

    const deleteBudgetItem = item => {
        return fetch(`http://localhost:8000/budget/${item.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`
            }
        })
            .then(res =>getBudgetItems(currentWedding.id))
    }

    const addBudgetItem = (item) => {
        return fetch("http://localhost:8000/budget", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(res => res.json())
        .then(res =>getBudgetItems(currentWedding.id))
    }

    const updateBudget = item => {
        return fetch(`http://localhost:8000/budget/${item.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
    }

    return (
        <BudgetContext.Provider value={{
            budgetItems, getBudgetItems, deleteBudgetItem, addBudgetItem, updateBudget
        }}>
            {props.children}
        </BudgetContext.Provider>
    )
}