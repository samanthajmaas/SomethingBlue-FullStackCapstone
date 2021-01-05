import React, { useContext } from "react"
import { ChecklistContext } from "./ChecklistProvider"
import Checkbox from '@material-ui/core/Checkbox'

export const ChecklistItem = (props) => {
    const { deleteChecklistItem, markCompleted } = useContext(ChecklistContext)
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked)
        markCompleted(props.item)
        props.func()
    }

    return (
        <>
            <section className="checklistItem">
                <>
                    <div>
                        {
                            props.item.completed_date != null ?
                                <>
                                    <div className="top-item-cont">
                                        <Checkbox
                                            checked="true"
                                            onChange={handleChange}
                                            color="#996D70"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <div className="item-name" style={{ textDecorationLine: 'line-through' }}>{props.item.checklist_item.toDo}</div>
                                        {
                                            props.editMode ?

                                                <button className="sml-btn" onClick={() => deleteChecklistItem(props.item)}> delete item</button> 
                                                :
                                                null
                                        }
                                    </div>
                                    <div className="completed">Completed on: {new Date(props.item.completed_date.concat("T00:00:00")).toDateString({})}</div>

                                </>

                                :
                                <>
                                    <div className="item-cont">
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChange}
                                            color="#996D70"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <div className="item-name">{props.item.checklist_item.toDo}</div>
                                        {
                                            props.editMode ?

                                                <button className="sml-btn" onClick={() => deleteChecklistItem(props.item)}> delete item</button> 
                                                :
                                                null
                                        }
                                    </div>
                                </>
                        }
                    </div>
                </>
            </section>
        </>
    )
}