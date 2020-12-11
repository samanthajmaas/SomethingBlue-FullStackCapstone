import React, { useState } from "react"

export const BrideContext = React.createContext()

export const BrideProvider = (props) => {

    const [brides, setBrides] = useState([])
    const [currentBride, setCurrentBride] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [bride, setBride] = useState({})

    const getBrides = () => {
        return fetch("http://localhost:8000/brides", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setBrides)
    }

    const getCurrentBride = () => {
        return fetch("http://localhost:8000/brides/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentBride)
    }

    const getSingleBride = (brideId) => {
        return fetch(`http://localhost:8000/brides/${brideId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setBride)
    }

    return (
        <BrideContext.Provider value={{
            brides, getBrides, currentBride, getCurrentBride, loggedIn, setLoggedIn, getSingleBride, bride
        }}>
            {props.children}
        </BrideContext.Provider>
    )
}