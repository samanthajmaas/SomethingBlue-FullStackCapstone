import React, { useState } from "react"

export const WeddingContext = React.createContext()

export const WeddingProvider = (props) => {
    const [weddings, setWeddings] = useState([])
    const [wedding, setCurrentWedding] = useState({rareuser:{}, category:{}})

    const getSingleWedding = (id) => {
        return fetch(`http://localhost:8000/weddings/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentWedding)
    }

    const getWeddings = () => {
        return fetch("http://localhost:8000/weddings", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(setWeddings)
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
            .then((res) => {
                getWeddings()
                return res.id})
    }

    const deleteWedding = weddingId => {
        return fetch(`http://localhost:8000/weddings/${weddingId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${localStorage.getItem("blue_token")}`},
        })
            .then(getWeddings)
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
            .then(getWeddings)

    }

    return (
        <WeddingContext.Provider value={{
            weddings, wedding, getSingleWedding, getWeddings, updatedWedding, deleteWedding, addWedding
        }}>
            {props.children}
        </WeddingContext.Provider>
    )

}