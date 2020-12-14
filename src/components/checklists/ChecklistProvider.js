import React, { useState } from "react"

export const ChecklistContext = React.createContext()

export const ChecklistProvider = (props) => {

    const [checklistItems, setChecklistItems] = useState([])


    const getChecklistItems = (weddingId) => {
        return fetch(`http://localhost:8000/checklist?wedding=${weddingId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setChecklistItems)
    }

    const deleteChecklistItem = item => {
        return fetch(`http://localhost:8000/checklist/${item.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`
            }
        })
            .then(getChecklistItems)
    }


    return (
        <ChecklistContext.Provider value={{
            checklistItems, getChecklistItems, deleteChecklistItem
        }}>
            {props.children}
        </ChecklistContext.Provider>
    )
}