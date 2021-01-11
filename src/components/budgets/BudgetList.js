import React, { useContext, useEffect, useState } from "react"
import { BudgetItem } from "./BudgetItem"
import { BudgetContext } from "./BudgetProvider"
import { AddNewSaveFor } from "./NewBudgetItemForm"
import "./Budget.css"
import { PieChart } from "./PieChart"
import { WeddingContext } from "../weddings/WeddingProvider"

export const BudgetList = (props) => {
    const { budgetItems, getBudgetItems, searchTerms, setTerms } = useContext(BudgetContext)
    const { currentWedding, getCurrentWedding } = useContext(WeddingContext)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [changed, setChanged] = useState(true)
    const [filteredBudget, setFiltered] = useState([])
    const toggleChange = () => (changed ? setChanged(false) : setChanged(true))

    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getBudgetItems(weddingId)
    }, [])

    useEffect(() => {
        getCurrentWedding()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = budgetItems.filter(bi =>
                bi.budget_item.save_for.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else (
            setFiltered([])
        )
    }, [searchTerms, budgetItems])

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
                            : <input type="text"
                                className="search"
                                onKeyUp={
                                    (keyEvent) => setTerms(keyEvent.target.value)
                                }
                                placeholder="Search " />}
                    </div>
                </section>
            </article>
            <article className="chart-cont">
                <PieChart key={currentWedding.id} currentWedding={currentWedding} budgetItems={budgetItems} getBudgetItems={getBudgetItems} {...props} />
            </article>
            {
                addMode ?
                    <article className="items" style={{ marginTop: '20em' }}>
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
                    </article> :
                    <article className="items">
                        {filteredBudget.length !== 0 ?
                            <div className="filteredBudget">
                                {
                                    filteredBudget.map(b => {
                                        return <BudgetItem
                                            key={b.id}
                                            item={b}
                                            func={toggleChange}
                                            editMode={editMode}
                                            setEditMode={setEditMode}
                                            {...props} />
                                    })
                                }
                            </div>
                            :
                            <div>
                                {
                                    budgetItems.map(b => {
                                        return <BudgetItem
                                            key={b.id}
                                            item={b}
                                            func={toggleChange}
                                            editMode={editMode}
                                            setEditMode={setEditMode}
                                            {...props} />
                                    })
                                }
                            </div>
                        }
                    </article>
            }
        </>
    )
}