import React, {useContext, useState } from "react"
import { VisionBoardContext } from "./VisionBoardProvider"

export const  NewImageForm= (props) => {
    const {addImage} = useContext(VisionBoardContext)
    const [img, setImg] = useState('')

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setImg(base64ImageString)
        });
    }

    const constructNewImage = () => {
        addImage({
            vb_img: img
        })
            .then(() => props.setAddMode(false))
    }

    return (
        <form className="form addImageForm" id="addImageForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="vs-x x" onClick={()=>{
                    props.setAddMode(false)
                }}>X</span>
            </div>
            <h2 className="todoForm_label">new inspiration</h2>
            <fieldset>
                    <input className="register-input vs-photoUpload" type="file" id="vb_img" onChange={(evt) => { createImageJSON(evt) }} />
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    constructNewImage()
                }}
                className="btn post_submit_btn">
                save
            </button>

        </form>
    )
}