import React, {useContext, useState } from "react"
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
                <h2 className="todoForm_label">add new to do</h2>
                    <span className=" x" onClick={()=>{
                        props.setAddMode(false)
                    }}>X</span>
                    
            </div>
            
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
                save
            </button>

        </form>
    )
}