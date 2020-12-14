import React, { useContext, useState } from "react"
import { WeddingContext } from "./WeddingProvider"

export const EditWeddingForm = (props) => {
    const { updatedWedding } = useContext(WeddingContext)
    const [wedding, setWedding] = useState({})

    const handleControlledInputChange = (e) => {
        const newWedding = Object.assign({}, wedding)
        newWedding[e.target.name] = e.target.value
        setWedding(newWedding)
    }

    const changeWedding = () => {
        const newWeddingObj = {
            id: props.currentWedding.id,
            event_date: wedding.event_date,
            location: wedding.location,
            budget: wedding.budget
        }
        updatedWedding(newWeddingObj)
            .then(()=> {
                props.setEditMode(false)
                props.history.push("/")
                window.location.reload()
            })
        }

    return (

        <form className="form change_Wedding_form" id="editWeddingForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    props.setEditMode(false)
                }}>X</span>
            </div>
            <h2 className="WeddingForm_label">Edit Wedding Details</h2>
            <fieldset>
                <div className="form-div">
                    <input type="date" name="event_date" className="form-control edit-wedding-input" id="event_date"
                        defaultValue={props.currentWedding.event_date}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="location" className="form-control edit-wedding-input" id="location"
                        proptype="varchar"
                        placeholder="Location of Wedding"
                        defaultValue={props.currentWedding.location}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="budget" className="form-control edit-wedding-input" id="budget"
                        proptype="int"
                        placeholder="Overall wedding budget"
                        defaultValue={props.currentWedding.budget}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    changeWedding()
                }}
                className="btn post_submit_btn">
                Save Event Details
            </button>
            <button type="button"
                className="btn cancel"
                onClick={e => {
                    e.preventDefault()
                }}>
                    Cancel
            </button>
        </form>
    )
}