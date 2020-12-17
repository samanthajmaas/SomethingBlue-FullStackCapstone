import React, { useState } from "react"

export const BudgetContext = React.createContext()

export const BudgetProvider = (props) => {

    const [budgetItems, setBudgetItems] = useState([])

    const getBudgetItems = () => {
        return fetch('http://localhost:8000/budget', {
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
            .then(getBudgetItems)
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
        .then(getBudgetItems)
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