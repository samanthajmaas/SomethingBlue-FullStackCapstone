import React, { useContext, useEffect, useState } from "react"
import {ChecklistItem} from "./ChecklistItem"
import { ChecklistContext } from "./ChecklistProvider"
import { AddNewToDo } from "./NewToDoForm"

export const Checklist = (props) => {
    const { checklistItems, getChecklistItems } = useContext(ChecklistContext)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [changed, setChanged] = useState(true)
    const toggleChange = () => (changed ? setChanged(false) : setChanged(true))

    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getChecklistItems(weddingId)
    }, [changed])

    return (
        <>
            <div className="checklist-list-cont">
                <section className="checklistitems">
                <h2>Your Wedding Checklist</h2>
                <div className="countdown"> "Insert countdown" Days Left!</div>
                    <button className="addItem" onClick={() => {
                        setAddMode(true)
                    }}>Add To Do</button>
                <div>
                    {
                        editMode == true ?
                        <button className="editList" onClick={() => {
                            setEditMode(false)
                        }}>Cancel</button> :
                        <button className="editList" onClick={() => {
                            setEditMode(true)
                        }}>Edit List</button>
                    }
                </div>
                <div>
                    {addMode
                        ? <AddNewToDo
                            setAddMode={setAddMode}
                            {...props} />
                        : null}
                </div>
                <div className="items">
                    {checklistItems.map(c => {
                        return <ChecklistItem
                            key={c.id}
                            item={c}
                            func={toggleChange}
                            editMode = {editMode}
                            setEditMode = {setEditMode}
                            {...props} />
                    })
                    }
                </div>
                </section>
            </div>
        </>
    )
}

