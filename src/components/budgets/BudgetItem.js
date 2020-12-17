import React, { useContext, useState } from "react"
import { BudgetContext } from "./BudgetProvider"

export const BudgetItem = (props) => {

    const { deleteBudgetItem, updateBudget } = useContext(BudgetContext)

    const [item, setItem] = useState({
        id: props.item.id,
        estimated_cost: props.item.estimated_cost,
        actual_cost: props.item.actual_cost
    })

    const handleControlledInputChange = (e) => {
        const newItem = Object.assign({}, item)
        newItem[e.target.name] = e.target.value
        setItem(newItem)
    }

    const handleKeypress = e => {
      if (e.key === "Enter") {
        updateBudget(item);
      }
    }

    return (
        <>
            <section className="budgetItem">
                <>
                    {
                        props.editMode ?

                            <button className="btn-small fa fa-trash" onClick={() => deleteBudgetItem(props.item)}>X
                        </button> :
                            null
                    }
                    <div>
                        <div className="budget-save-for">{props.item.budget_item.save_for}</div>
                    </div>
                    <div className="inputs">
                        <fieldset>
                            <div className="form-div">
                                <input type="text" name="estimated_cost" className="form-control estimated_cost" id="estimated_cost"
                                    defaultValue={props.item.estimated_cost}
                                    placeholder="estimated cost"
                                    onChange={handleControlledInputChange}
                                    onKeyPress={handleKeypress}>
                                </input>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-div">
                                <input type="text" name="actual_cost" className="form-control actual_cost" id="actual_cost"
                                    defaultValue={props.item.actual_cost}
                                    placeholder="actual cost"
                                    onChange={handleControlledInputChange}
                                    onKeyPress={handleKeypress}>
                                </input>
                            </div>
                        </fieldset>
                    </div>
                </>
            </section>
        </>
    )
}