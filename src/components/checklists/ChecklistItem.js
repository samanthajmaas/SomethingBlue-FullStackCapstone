import React, { useContext } from "react"
import { ChecklistContext } from "./ChecklistProvider"
import Checkbox from '@material-ui/core/Checkbox'
import { Draggable } from 'react-beautiful-dnd';


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
                <div>
                    {
                        props.item.completed_date != null ?
                            <>
                                {props.editMode ?
                                    <>
                                        <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
                                            {(provided)=> (
                                            <div className="edit-checklist-container" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                            <div className="top-item-cont">
                                                <button className="btn delete-check-btn" onClick={() => props.deleteChecklistItem(props.item)}> delete </button>
                                                <Checkbox
                                                    checked="true"
                                                    onChange={props.handleChange}
                                                    color="#996D70"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                                <div className="edit-item-name" style={{ textDecorationLine: 'line-through' }}>{props.item.checklist_item.toDo}</div>
                                            </div>
                                            <div className="edit-completed">Completed on: {new Date(props.item.completed_date.concat("T00:00:00")).toDateString({})}</div>
                                        </div>
                                            )}
                                        </Draggable>
                                    </> :
                                    <>
                                        <div className="top-item-cont">
                                            <Checkbox
                                                checked="true"
                                                onChange={handleChange}
                                                color="#996D70"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                            <div className="item-name" style={{ textDecorationLine: 'line-through' }}>{props.item.checklist_item.toDo}</div>
                                        </div>
                                        <div className="completed">Completed on: {new Date(props.item.completed_date.concat("T00:00:00")).toDateString({})}</div>
                                    </>
                                }
                            </>
                            :
                            <>
                                <div className="item-cont">
                                    {
                                        props.editMode ?
                                            <>
                                                <Draggable>
                                                    <div className="edit-checklist-container">
                                                        <div className="top-item-cont">
                                                            <button className="btn delete-check-btn" onClick={() => deleteChecklistItem(props.item)}> delete </button>
                                                            <Checkbox
                                                                checked={checked}
                                                                onChange={handleChange}
                                                                color="#996D70"
                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                            />
                                                            <div className="edit-item-name">{props.item.checklist_item.toDo}</div>
                                                        </div>
                                                    </div>
                                                </Draggable>
                                            </>
                                            :
                                            <>
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    color="#996D70"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                                <div className="item-name">{props.item.checklist_item.toDo}</div>
                                            </>
                                    }
                                </div>
                            </>
                    }
                </div>
            </section>
        </>
    )
}