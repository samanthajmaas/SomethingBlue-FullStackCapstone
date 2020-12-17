import React, { useContext, useEffect, useState } from "react"
import { ChecklistItem } from "./ChecklistItem"
import { ChecklistContext } from "./ChecklistProvider"
import { AddNewToDo } from "./NewToDoForm"
import "./Checklist.css"

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
                <div className="checklistitems-right">
                    <h2>Your Wedding Checklist</h2>
                    <div className="countdown"> "Insert countdown" Days Left!</div>

                    <div className="checlist-items-left">
                        <button className="addItem" onClick={() => {
                            setAddMode(true)
                        }}>add to do</button>
                        <div>
                            {
                                editMode == true ?
                                    <button className="editList" onClick={() => {
                                        setEditMode(false)
                                    }}>cancel</button> :
                                    <button className="editList" onClick={() => {
                                        setEditMode(true)
                                    }}>edit list</button>
                            }
                        </div>
                        <div>
                            {addMode
                                ? <AddNewToDo
                                    setAddMode={setAddMode}
                                    {...props} />
                                : null}
                        </div>
                </div>

                
                    <div className="items">
                        {checklistItems.map(c => {
                            return <ChecklistItem
                                key={c.id}
                                item={c}
                                func={toggleChange}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                {...props} />
                        })
                        }
                </div>
                
            </div>
        </div>
        </>
    )
}

