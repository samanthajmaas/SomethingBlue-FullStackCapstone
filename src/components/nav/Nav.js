import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { BrideContext } from "../brides/BrideProvider"
import "./Nav.css"

export const Nav = (props) => {
    const { currentBride, getCurrentBride, getSingleBride, bride } = useContext(BrideContext)
   

    useEffect(() => {
        getCurrentBride()
    }, [])

    useEffect(() => {
        getSingleBride(currentBride.id)
    }, [currentBride])
    return (
        <>
            <div className="nav">
                <Link
                    className="btn nav__btn"
                    onClick={() => props.history.push("/checklist")}>
                    Checklist
                            </Link>
                <Link
                    title="Review My Posts"
                    className="btn nav__btn"
                    onClick={() => props.history.push(`/budget`)}>
                    Budgeter
                            </Link>

                <Link
                    className="btn nav__btn guests"
                    onClick={() => props.history.push("/guests")}>
                    Guest List
                            </Link>

                <Link
                    className="btn nav__btn user-manager"
                    onClick={() => props.history.push(`/visionboard`)}>
                    Vision Board
                            </Link>
                <Link
                    className="btn nav__btn"
                    onClick={() => {
                        localStorage.removeItem("blue_token")
                        props.history.push("/login")
                    }}>
                    Logout
                </Link>
            </div>
            <div className="right-nav">
                <img className="image" style={{ height: "5em" }} alt="" src={bride.profile_image_url} />
            </div>
        </>
    )
}