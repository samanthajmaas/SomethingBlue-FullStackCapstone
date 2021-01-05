import React, { useContext, useEffect, useState } from "react"
import { BudgetItem } from "./BudgetItem"
import { BudgetContext } from "./BudgetProvider"
import { AddNewSaveFor } from "./NewBudgetItemForm"
import "./Budget.css"

export const BudgetList = (props) => {
    const { budgetItems, getBudgetItems } = useContext(BudgetContext)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [changed, setChanged] = useState(true)
    const toggleChange = () => (changed ? setChanged(false) : setChanged(true))

    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getBudgetItems(weddingId)
    }, [])

    return (
        <>
            <article className="budgetlist-cont">
                <section className="budgetListItems-right">
                    <h2 className="budget-title">Your Wedding Budget</h2>
                    <div className="subheader">Keep track of your budget and spending.</div>
                </section>
                <section className="budgetListItems-left">
                    <div className="btn-cont">
                        <button className="addItem btn" onClick={() => {
                            setAddMode(true)
                        }}>add budget item</button>
                        <div className="edit-btn-cont">
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
                    <div>
                        {addMode
                            ? <AddNewSaveFor
                                setAddMode={setAddMode}
                                {...props} />
                            : null}
                    </div>
                </section>
            </article>
            <article className="items">
                {budgetItems.map(b => {
                    return <BudgetItem
                        key={b.id}
                        item={b}
                        func={toggleChange}
                        editMode={editMode}
                        setEditMode={setEditMode}
                        {...props} />
                })
                }
            </article>

        </>
    )
}