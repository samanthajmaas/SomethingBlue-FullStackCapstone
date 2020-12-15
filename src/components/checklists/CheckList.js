import React, { useContext, useEffect } from "react"
import { WeddingContext } from "../weddings/WeddingProvider"
import {ChecklistItem} from "./ChecklistItem"
import { ChecklistContext } from "./ChecklistProvider"

export const Checklist = (props) => {
    const { checklistItems, getChecklistItems } = useContext(ChecklistContext)


    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getChecklistItems(weddingId)
    }, [])

    return (
        <>
            <div className="checklist-list-cont">
                <section className="checklistitems">
                <h2>Your Wedding Checklist</h2>
                <div className="countdown"> "Insert countdown" Days Left!</div>
                    {checklistItems.map(c => {
                        return <ChecklistItem
                            key={c.id}
                            item={c}
                            {...props} />
                    }).reverse()
                    }
                </section>
            </div>
        </>
    )
}