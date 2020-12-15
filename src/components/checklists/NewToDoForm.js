import React, {useContext, useEffect, useState } from "react"
import { ChecklistContext } from "./ChecklistProvider"

export const  AddNewToDo= (props) => {
    const {addToDo} = useContext(ChecklistContext)

    const [item, setItem] = useState({
        toDo: ""
    })

    const handleControlledInputChange = (e) => {
        const newItem = Object.assign({}, item)
        newItem[e.target.name] = e.target.value
        setItem(newItem)
    }

    const constructNewToDo = () => {
        addToDo(item)
            .then(() => props.setAddMode(false))
    }

    return (
        <form className="form addTodoForm" id="addToDoForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    props.setAddMode(false)
                }}>X</span>
            </div>
            <h2 className="todoForm_label">Add a new To Do</h2>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="toDo" className="form-control toDo-input" id="toDo"
                        defaultValue={item.toDo}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    constructNewToDo()
                }}
                className="btn post_submit_btn">
                Save To Do
            </button>

        </form>
    )
}