import React, { useContext} from "react"
import { ChecklistContext } from "./ChecklistProvider"
import Checkbox from '@material-ui/core/Checkbox'

export const ChecklistItem = (props) => {
    const {deleteChecklistItem, markCompleted} = useContext(ChecklistContext)
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
                    {
                        props.editMode ? 
                    
                        <button className="btn-small fa fa-trash" onClick={() => deleteChecklistItem(props.item)}>X
                        </button> :
                        null
                    }
                        <div>
                            {
                                props.item.completed_date != null  ?
                                <>
                                <div className="item-name" style={{textDecorationLine: 'line-through'}}>{props.item.checklist_item.toDo}</div>
                                <div className="completed">{props.item.completed_date}</div>
                                </> :
                                <>
                                <div className="item-name">{props.item.checklist_item.toDo}</div>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                </>
                            }
                        </div>
                    </>
            </section>
        </>
    )
}