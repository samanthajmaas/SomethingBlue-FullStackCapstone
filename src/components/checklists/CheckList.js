import React, { useContext, useEffect, useState } from "react"
import { ChecklistItem } from "./ChecklistItem"
import { ChecklistContext } from "./ChecklistProvider"
import { AddNewToDo } from "./NewToDoForm"
import "./Checklist.css"
import { WeddingContext } from "../weddings/WeddingProvider"

export const Checklist = (props) => {
    const { checklistItems, getChecklistItems } = useContext(ChecklistContext)
    const {currentWedding} = useContext(WeddingContext)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [changed, setChanged] = useState(true)
    const toggleChange = () => (changed ? setChanged(false) : setChanged(true))

    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getChecklistItems(weddingId)
    }, [changed])

    const daysLeft = () => {
        const weddingDate = currentWedding.event_date
        const day = new Date().getDate()
        const month = new Date().getMonth() +1
        const year = new Date().getFullYear()

        const today = [month, day, year, " ", weddingDate]
        return today
    }

    return (
        <>
            <article className="checklist-list-cont">
                <div className="checklistitems-right">
                    <h2 className="checklist-title">Your Wedding Checklist</h2>
                    <div className="countdown"> {daysLeft()} Days Left!</div>
                </div>
                <div className="checlist-items-left">
                    <div className="btn-cont">
                        <div className="add-btn-cont">
                            <button className="addItem btn" onClick={() => {
                                setAddMode(true)
                            }}>add to do</button>
                        </div>
                        <div className="edit-btn-cont ">
                            {
                                editMode == true ?
                                    <button className="editList btn" onClick={() => {
                                        setEditMode(false)
                                    }}>cancel</button> :
                                    <button className="editList btn" onClick={() => {
                                        setEditMode(true)
                                    }}>edit list</button>
                            }
                        </div>
                    </div>
                    <div className="add-to-do-cont">
                        {addMode
                            ? <AddNewToDo
                                setAddMode={setAddMode}
                                {...props} />
                            : null}
                    </div>
                </div>
            </article>
            <article className="checklist-bottom-cont">
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
            </article>
        </>
    )
}

