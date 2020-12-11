import React, { useState, useEffect, useContext } from "react"
import "./Dashboard.css"
import { BrideContext } from "../brides/BrideProvider"
import { Link } from "react-router-dom"
import Logo from "./Dashboard_Logo.png"



export const Dashboard = (props) => {
    const {currentBride, getCurrentBride, getSingleBride, bride} = useContext(BrideContext)

    useEffect(()=>{
        getCurrentBride()
    }, [])

    useEffect(() =>{
        getSingleBride(currentBride.id)
    }, [currentBride])

    return (
        <>
        <img className="register-img" src={Logo}></img>
        <div className="dashboard-container">
            <div className="right-side">
                <h1 className="welcome"> Welcome, {currentBride.first_name}! </h1>
                <img classname="userProfileImage" src={bride.profile_image_url}/>
                <div className="weddingDate">Date</div>
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
            </div>
        </div>
        </>
    )
}