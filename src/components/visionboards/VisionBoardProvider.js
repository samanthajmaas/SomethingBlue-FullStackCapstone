import React, { useContext, useEffect, useState } from "react"

export const VisionBoardContext = React.createContext()

export const VisionBoardProvider = (props) => {
    const [images, setImages] = useState([])

    const getImages = () => {
        return fetch(`http://localhost:8000/visionboard`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setImages)
    }

    const deleteImage = image => {
        return fetch(`http://localhost:8000/visionboard/${image.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`
            }
        })
            .then(getImages)
    }

    const addImage = (image) => {
        return fetch("http://localhost:8000/visionboard", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("blue_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
        .then(res => res.json())
        .then(getImages)
    }

    return (
        <VisionBoardContext.Provider value={{
            images, getImages, addImage, deleteImage
        }}>
            {props.children}
        </VisionBoardContext.Provider>
    )
}