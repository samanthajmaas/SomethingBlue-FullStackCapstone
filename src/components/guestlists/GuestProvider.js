import React, {useState } from "react"

export const GuestContext = React.createContext()

export const GuestProvider = (props) => {
    const [guests, setGuests] = useState([])

    const getGuests = () => {
        return fetch(`http://localhost:8000/guests`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setGuests)
    }

    const deleteGuest = guest => {
        return fetch(`http://localhost:8000/guests/${guest.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`
            }
        })
            .then(getGuests)
    }

    const addGuest = (guest) => {
        return fetch("http://localhost:8000/guests", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guest)
        })
        .then(res => res.json())
        .then(getGuests)
    }

    const updateGuest = guest => {
        return fetch(`http://localhost:8000/guests/${guest.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guest)
        })
        .then(getGuests)
    }

    return (
        <GuestContext.Provider value={{
            guests, getGuests, addGuest, deleteGuest, updateGuest
        }}>
            {props.children}
        </GuestContext.Provider>
    )
}