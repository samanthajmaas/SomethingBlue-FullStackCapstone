import React, { useContext, useEffect, useState } from "react"
import { BudgetItem } from "./BudgetItem"
import { BudgetContext } from "./BudgetProvider"
import { AddNewSaveFor } from "./NewBudgetItemForm"

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
            <div className="budgetlist-cont">
                <section className="budgetListItems">
                <h2>Your Wedding Budget</h2>
                <div className="subheader">Keep track of your budget and spending.</div>
                    <button className="addItem" onClick={() => {
                        setAddMode(true)
                    }}>add budget item</button>
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
                        ? <AddNewSaveFor
                            setAddMode={setAddMode}
                            {...props} />
                        : null}
                </div>
                <div className="items">
                    {budgetItems.map(b => {
                        return <BudgetItem
                            key={b.id}
                            item={b}
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