import React, { useState, useEffect, useContext } from "react"
import "./Nav.css"
import Logo from "./auth/Blue_Logo.png"
import { BrideContext } from "../brides/BrideProvider"


export const Nav = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const {currentBride, getCurrentBride} = useContext(BrideContext)

    useEffect(()=>{
        getCurrentBride()
    }, [])

    useEffect(()=>{
        if(localStorage.getItem("blue_token")!== null){
            setLoggedIn(true)
        }
        else{
            setLoggedIn(false)
        }
    }, [currentBride])

    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div>
                <div className="link logo-wrapper left">
                    <div className="top-space"></div>
                    <div className="middle-wrap">
                        <img className="nav__logo"
                        to="/blue"
                        onClick={()=>{
                        props.history.push("/blue")}}
                        src={Logo} />
                        <div className="right-middle"></div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link wrapper__nav--right">
                        <div className={`${admin ? "admin-nav-link-wrap": "nav__link-wrapper"}`}>
                            <button
                            className="btn nav__btn"
                            onClick={()=>props.history.push(`${loggedIn ? '/posts' : '/login'}`)}>
                                All Posts
                            </button>

                            {loggedIn
                            ?<>
                                <button
                                title="Review My Posts"
                                className="btn nav__btn"
                                onClick={()=>props.history.push(`/users/posts`)}>
                                    My Posts
                                </button>

                                <button
                                title={`${admin ? "Manage Categories" : "View Categories"}`}
                                className={`btn nav__btn ${admin ? "admin-categories" : "categories"}`}
                                onClick={()=>props.history.push("/categories")}>
                                    {admin ? "Category Manager" : "Categories"}
                                </button>

                                <button
                                title={`${admin ? "Manage Tags" : "View Tags"}`}
                                className={`btn nav__btn ${admin ? "admin-tags" : "tags"}`}
                                onClick={()=>props.history.push("/tags")}>
                                    {admin ? "Tag Manager" : "Tags"}
                                </button>

                                {admin ?<>
                                <button
                                className="btn nav__btn user-manager"
                                onClick={()=>props.history.push(`/users`)}>
                                    User Manager
                                </button> </>
                                : null
                                }
                            </>
                            : null
                            }
                            <button
                            title={`${loggedIn ? "Logout" : "Login"}`}
                            className={`btn nav__btn ${loggedIn ? "logout" :"get-started"}`}
                            onClick={() => {
                                if(loggedIn){
                                    handleLogout()
                                    props.history.push("/rare")
                                }
                                else{
                                    props.history.push("/login")
                                }
                            }}>
                                {loggedIn ? "Logout" : "Get Sarted"}
                            </button>

                        </div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="spacer__nav--right"></div>
            </div>
        </div>
        </>
    )
}