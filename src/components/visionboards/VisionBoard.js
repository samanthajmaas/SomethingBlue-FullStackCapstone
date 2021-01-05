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
            <article className="visionboard-cont">
                <section className="vs-top-cont">
                    <div className="subheading">A place for all of your visions and dreams...</div>
                    <button className="btn inspo-btn" onClick={() => {
                        setAddMode(true)
                    }}>add inspiration</button>
                    <div>
                        {addMode
                            ? <NewImageForm
                                setAddMode={setAddMode}
                                {...props} />
                            : null}
                    </div>
                </section>
            </article>
            <article className="visboard-bottom-cont">
                <div className="images">
                    {images.map(i => {
                        return <VBImage
                            key={i.id}
                            image={i}
                            {...props} />
                    })
                    }
                </div>
            </article>
        </>
    )
}
