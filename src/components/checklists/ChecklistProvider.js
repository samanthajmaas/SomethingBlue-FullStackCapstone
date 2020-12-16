import React, { useContext, useEffect, useState } from "react"
import { WeddingContext } from "../weddings/WeddingProvider"

export const ChecklistContext = React.createContext()

export const ChecklistProvider = (props) => {

    const [checklistItems, setChecklistItems] = useState([])
    const {currentWedding, getCurrentWedding} = useContext(WeddingContext)

    useEffect(() => {
        getCurrentWedding()
    }, [])

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
            .then(res => getChecklistItems(currentWedding.id))
    }

    const addToDo = (item) => {
        return fetch("http://localhost:8000/checklist", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(res => res.json())
        .then(res => getChecklistItems(currentWedding.id))
    }

    const markCompleted = (item) => {
        return fetch(`http://localhost:8000/checklist/${ item.id }/complete`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("blue_token")}`
            },
            body: JSON.stringify(item)
        })
            // .then(response => response.json())
            .then(getChecklistItems(currentWedding.id))
    }


    return (
        <ChecklistContext.Provider value={{
            checklistItems, getChecklistItems, deleteChecklistItem, addToDo, markCompleted
        }}>
            {props.children}
        </ChecklistContext.Provider>
    )
}