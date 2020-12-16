import React, {useContext, useState } from "react"
import { BudgetContext } from "./BudgetProvider"

export const  AddNewSaveFor= (props) => {
    const {addBudgetItem} = useContext(BudgetContext)

    const [item, setItem] = useState({
        save_for: "",
        estimated_cost: 10000
    })

    const handleControlledInputChange = (e) => {
        const newItem = Object.assign({}, item)
        newItem[e.target.name] = e.target.value
        setItem(newItem)
    }

    const constructNewSaveFor = () => {
        addBudgetItem(item)
            .then(() => props.setAddMode(false))
    }

    return (
        <form className="form addSaveForForm" id="addSaveForForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    props.setAddMode(false)
                }}>X</span>
            </div>
            <h2 className="todoForm_label">add item</h2>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="save_for" className="form-control save_for-input" id="save_for"
                        defaultValue={item.save_for}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="estimated_cost" className="form-control estimated-input" id="extimated_cost"
                        defaultValue={item.estimated_cost}
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    constructNewSaveFor()
                }}
                className="btn post_submit_btn">
                save
            </button>

        </form>
    )
}