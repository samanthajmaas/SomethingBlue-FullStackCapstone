import React, {useState } from "react"

export const ChecklistContext = React.createContext()

export const ChecklistProvider = (props) => {

    const [checklistItems, setChecklistItems] = useState([])
    const [ searchTerms, setTerms ] = useState("")


    const getChecklistItems = () => {
        return fetch(`http://localhost:8000/checklist`, {
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
        .then(getChecklistItems)
    }

    const markCompleted = (item) => {
        return fetch(`http://localhost:8000/checklist/${ item.id }/complete`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("blue_token")}`
            },
            body: JSON.stringify(item)
        })
            .then(getChecklistItems)
    }

    const updateList = (item) => {
        return fetch(`http://localhost:8000/checklist/updateList`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setChecklistItems)
    }


    return (
        <ChecklistContext.Provider value={{
            checklistItems, getChecklistItems, deleteChecklistItem, addToDo, markCompleted, searchTerms, setTerms, updateList 
        }}>
            {props.children}
        </ChecklistContext.Provider>
    )
}