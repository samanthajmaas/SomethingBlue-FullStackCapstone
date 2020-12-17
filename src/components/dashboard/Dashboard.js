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

    useEffect(()=>{
        getCurrentBride()
    },[])

    useEffect(() =>{
        getSingleBride(currentBride.id)
    }, [currentBride])

    useEffect(()=>{
        getCurrentWedding()
    },[])

    return (
        <>        
        <div className="dashboard-container">
            <div className="right-side">
                <h1 className="welcome"> Welcome, {currentBride.first_name}! </h1>
                <img className="image" style={{height: "20em"}} alt="" src={bride.profile_image_url}/>
                <br></br>
                <div className="weddingDate">{currentWedding.event_date}</div>
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
            <div>
                    {editMode
                        ? <EditWeddingForm
                            currentWedding={currentWedding}
                            setEditMode={setEditMode}
                            {...props} />
                        : null}
            </div>
            {/* <div className="left-side">
                <Link to="/checklist"> Wedding Checklist</Link>
                <br></br>
                <Link to="/budget">Bugeter</Link>
                <br></br>
                <Link to="/guests">Guest List</Link>
                <br></br>
                <Link to="/visionboard">Vision Board</Link>
                <br></br>
                <Link className="logout" onClick={() => {
                    localStorage.removeItem("blue_token")
                    props.history.push("/login")}}
                    >Logout</Link>
            </div> */}
        </div>
        </>
    )
}