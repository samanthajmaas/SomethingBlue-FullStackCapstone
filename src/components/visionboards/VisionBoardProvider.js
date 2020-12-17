import React, { useContext, useEffect, useState } from "react"
import { WeddingContext } from "../weddings/WeddingProvider"

export const VisionBoardContext = React.createContext()

export const VisionBoardProvider = (props) => {

    const [images, setImages] = useState([])
    const {currentWedding, getCurrentWedding} = useContext(WeddingContext)

    useEffect(() => {
        getCurrentWedding()
    }, [])

    const getImages = (weddingId) => {
        return fetch(`http://localhost:8000/visionboard?wedding=${weddingId}`, {
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
            .then(res => getImages(currentWedding.id))
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
        .then(res => getImages(currentWedding.id))
    }

    return (
        <VisionBoardContext.Provider value={{
            images, getImages, addImage, deleteImage
        }}>
            {props.children}
        </VisionBoardContext.Provider>
    )
}