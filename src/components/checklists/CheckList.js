import React, { useContext, useEffect, useState } from "react"
import { ChecklistItem } from "./ChecklistItem"
import { ChecklistContext } from "./ChecklistProvider"
import { AddNewToDo } from "./NewToDoForm"
import "./Checklist.css"
import { WeddingContext } from "../weddings/WeddingProvider"
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const Checklist = (props) => {
    const { checklistItems, getChecklistItems, searchTerms, setTerms } = useContext(ChecklistContext)
    const { currentWedding, getCurrentWedding } = useContext(WeddingContext)
    const [addMode, setAddMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [changed, setChanged] = useState(true)
    const [filteredChecklist, setFiltered] = useState([])
    const [items, updateItemsArr] = useState([])
    const toggleChange = () => (changed ? setChanged(false) : setChanged(true))

    useEffect(() => {
        const weddingId = parseInt(props.match.params.weddingId)
        getChecklistItems(weddingId)
    }, [changed])

    useEffect(() => {
        getCurrentWedding()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = checklistItems.filter(ci =>
                ci.checklist_item.toDo.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else (
            setFiltered([])
        )
    }, [searchTerms, checklistItems])


    const progress = () => {
        const findingProgress = checklistItems.filter(ci => ci.completed_date !== null)
        const currentProgress = findingProgress.length
        return currentProgress
    }

    const handleOnDragEnd = (result) => {

        const newItemsArray = Array.from(items)
        const [reorderedItemsArr] = newItemsArray.splice(result.source.index, 1);
        newItemsArray.splice(result.destination.index, 0, reorderedItemsArr);
        updateItemsArr(newItemsArray)
    }

    
    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <article className="checklist-list-cont">
                    <div className="checklistitems-right">
                        <h2 className="checklist-title">Your Wedding Checklist</h2>
                        <div className="countdown"> {currentWedding.countdown} Days Left!</div>
                    </div>

                    <div className="checlist-items-left">
                        <div className="btn-cont">
                            <div className="add-btn-cont">
                                <button className="addItem btn" onClick={() => {
                                    setAddMode(true)
                                }}>add to do</button>
                            </div>
                            <div className="edit-btn-cont ">
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
                        <div className="add-to-do-cont">
                            {addMode
                                ? <AddNewToDo
                                    setAddMode={setAddMode}
                                    {...props} />
                                : <input type="text"
                                    className="search"
                                    onKeyUp={
                                        (keyEvent) => setTerms(keyEvent.target.value)
                                    }
                                    placeholder="Search " />}
                        </div>

                    </div>
                </article>
                <div className="checklistitems-middle">
                    <div className="progress-cont">
                        <div className="progress-label">{progress()} / {checklistItems.length} completed</div>
                        <progress value={progress()} max={checklistItems.length} />
                    </div>
                </div>
                <article className="checklist-bottom-cont">
                    {filteredChecklist.length !== 0 ?
                        <div className="filteredChecklist">
                            {
                                filteredChecklist.map(c => {
                                    return <ChecklistItem
                                        key={c.id}
                                        item={c}
                                        func={toggleChange}
                                        editMode={editMode}
                                        setEditMode={setEditMode}
                                        {...props} />
                                })
                            }
                        </div>
                        :
                        <Droppable
                            droppableId="dropId">
                            {(provided) => (
                                <div className="items" 
                                {...provided.droppableProps} ref={provided.innerRef}
                                >
                                    {checklistItems.map((c, index) => {
                                        return <ChecklistItem
                                            key={c.id}
                                            item={c}
                                            func={toggleChange}
                                            editMode={editMode}
                                            setEditMode={setEditMode}
                                            index={index}
                                            {...props} />
                                    })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    }
                </article>
            </DragDropContext>
        </>
    )
}

