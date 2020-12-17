import React, { useContext, useEffect, useState } from "react"
import { VBImage } from "./Image"
import { NewImageForm } from "./NewImageForm"
import { VisionBoardContext } from "./VisionBoardProvider"
import "./VisionBoard.css"


export const VisionBoard = (props) => {
    const { images, getImages } = useContext(VisionBoardContext)
    const [addMode, setAddMode] = useState(false)
    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getImages(weddingId)
    }, [])

    return (
        <>
            <div className="visionboard-cont">
                <section className="images">
                <div className="countdown">A place for all of your visions and dreams...</div>
                    <button className="addItem" onClick={() => {
                        setAddMode(true)
                    }}>add inspiration</button>
                <div>
                    {addMode
                        ? <NewImageForm
                            setAddMode={setAddMode}
                            {...props} />
                        : null}
                </div>
                <div className="images">
                    {images.map(i => {
                        return <VBImage
                            key={i.id}
                            image={i}
                            {...props} />
                    })
                    }
                </div>
                </section>
            </div>
        </>
    )
}
