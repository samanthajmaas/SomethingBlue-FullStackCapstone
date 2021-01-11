import React, {useEffect, useContext, useState } from "react"
import "./Dashboard.css"
import { BrideContext } from "../brides/BrideProvider"
import { Link } from "react-router-dom"
import { WeddingContext } from "../weddings/WeddingProvider"
import { EditWeddingForm } from "../weddings/EditWeddingForm"

export const Dashboard = (props) => {
    const {currentBride, getCurrentBride, getSingleBride, bride} = useContext(BrideContext)
    const {currentWedding, getCurrentWedding} = useContext(WeddingContext)
    const [editMode, setEditMode] = useState(false)
    const [changed, setChanged] = useState(true)
    const toggleChange = () => (changed ? setChanged(false) : setChanged(true))

    useEffect(()=>{
        getCurrentBride()
    },[changed])

    useEffect(() =>{
        getSingleBride(currentBride.id)
    }, [currentBride])

    useEffect(()=>{
        getCurrentWedding()
    },[changed])

    const fixDate = () => {
        if (currentWedding.hasOwnProperty('event_date')){
            return new Date(currentWedding.event_date.concat("T00:00:00")).toDateString({})
        }
    }

    return (
        <>        
        <div className="dash-top">
            <h1 className="welcome"> Welcome, {currentBride.first_name}! </h1>
        </div>
        <div className="dashboard-container">
            <div className="right-side">
                <img className="image" style={{height: "20em"}} alt="" src={bride.profile_image_url}/>
                <br></br>
                <div className="weddingDate">{fixDate()}</div>
                <div className="weddingLocation">{currentWedding.location != null ?
                    currentWedding.location : <span className="wedding-location" onClick={() => {
                        setEditMode(true)
                    }}>
                        add location to wedding event
                    </span>
                }
                </div>
                <span className="updateEvent" onClick={() => {
                        setEditMode(true)
                    }}>
                        update event details
                    </span>
            </div>
           
            <div className="left-side">
                <div className="countdown">{currentWedding.countdown} days until wedding</div>
            </div>
        </div>
        <div>
                    {editMode
                        ? <EditWeddingForm
                            currentWedding={currentWedding}
                            setEditMode={setEditMode}
                            toggleChange ={toggleChange}
                            {...props} />
                        : null}
            </div>
        </>
    )
}