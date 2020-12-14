import React, {useEffect, useContext, useState } from "react"
import "./Dashboard.css"
import { BrideContext } from "../brides/BrideProvider"
import { Link } from "react-router-dom"
import Logo from "./Dashboard_Logo.png"
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
        <img className="register-img" alt ="" src={Logo}></img>
        
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
                        Add Location to Event
                    </span>
                }
                </div>
                <span className="updateEvent" onClick={() => {
                        setEditMode(true)
                    }}>
                        Update Event Details
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
            <div className="left-side">
                <Link to ={`/checklist?wedding=${currentWedding.id}`}> Wedding Checklist</Link>
                <br></br>
                <Link>Bugeter</Link>
                <br></br>
                <Link>Guest List</Link>
                <br></br>
                <Link>Vision Board</Link>
                <br></br>
                <Link className="logout" to="/logout">Logout</Link>
            </div>
        </div>
        </>
    )
}