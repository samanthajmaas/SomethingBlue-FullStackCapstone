import React, { useContext } from "react"
import { ChecklistContext } from "./ChecklistProvider"

export const ChecklistItem = (props) => {

    const {deleteChecklistItem} = useContext(ChecklistContext)

    return (
        <>
            <section className="checklistItem">
                    <>
                        {/* <button className="btn-small fa fa-edit" onClick={() => {
                            props.setEditMode(true)
                            props.setCurrentCategory(props.category)
                        }}>
                        </button> */}
                        <button className="btn-small fa fa-trash" onClick={() => deleteChecklistItem(props.item.id)}>
                        </button>
                        <div className="item-name">{props.item.checklist_item.toDo}</div>
                    </>
            </section>
        </>
    )
}