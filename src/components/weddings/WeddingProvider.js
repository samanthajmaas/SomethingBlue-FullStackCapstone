import React, { useState } from "react"

export const WeddingContext = React.createContext()

export const WeddingProvider = (props) => {
    const [currentWedding, setCurrentWedding] = useState({bride:{}})

    const getCurrentWedding = () => {
        return fetch("http://localhost:8000/weddings/current_brides_wedding", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentWedding)
    }

    const addWedding = wedding => {
        return fetch("http://localhost:8000/weddings", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wedding)
        })
            .then(res => res.json())
    }

    const deleteWedding = weddingId => {
        return fetch(`http://localhost:8000/weddings/${weddingId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${localStorage.getItem("blue_token")}`},
        })
    }


    const updatedWedding = wedding => {
        return fetch(`http://localhost:8000/weddings/${wedding.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wedding)
        })
    }

    return (
        <WeddingContext.Provider value={{
            currentWedding, getCurrentWedding, updatedWedding, deleteWedding, addWedding
        }}>
            {props.children}
        </WeddingContext.Provider>
    )

}