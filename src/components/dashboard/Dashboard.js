import React, {useEffect, useContext } from "react"
import "./Dashboard.css"
import { BrideContext } from "../brides/BrideProvider"
import { Link } from "react-router-dom"
import Logo from "./Dashboard_Logo.png"
import { WeddingContext } from "../weddings/WeddingProvider"



export const Dashboard = () => {
    const {currentBride, getCurrentBride, getSingleBride, bride} = useContext(BrideContext)
    const {currentWedding, getCurrentWedding} = useContext(WeddingContext)

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
        <img className="register-img" src={Logo}></img>
        
        <div className="dashboard-container">
            <div className="right-side">
                <h1 className="welcome"> Welcome, {currentBride.first_name}! </h1>
                <img className="image" style={{height: "20em"}} alt="" src={bride.profile_image_url}/>
                <br></br>
                <div className="weddingDate">{currentWedding.event_date}</div>
                <div className="weddingLocation">Location</div>
                <Link>Update Event Details</Link>
            </div>
            <div className="left-side">
                <Link>Wedding Checklist</Link>
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