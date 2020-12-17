import React from "react"
import "./Nav.css"


export const Nav = (props) => {
    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div>
                <div className="link logo-wrapper left">

                </div>
                <div className="link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link wrapper__nav--right">
                        <div className="nav__link-wrapper">
                            <button
                            className="btn nav__btn"
                            onClick={()=>props.history.push("/checklist")}>
                                Checklist
                            </button><>
                            <button
                            title="Review My Posts"
                            className="btn nav__btn"
                            onClick={()=>props.history.push(`/budget`)}>
                                Budget
                            </button>

                            <button
                            className="btn nav__btn guests"
                            onClick={()=>props.history.push("/guests")}>
                                Guest List
                            </button>

                            <button
                            className="btn nav__btn user-manager"
                            onClick={()=>props.history.push(`/users`)}>
                                Vision Board
                            </button> 
</>
                            <button
                            className="btn nav__btn login"
                            onClick={() => {
                    
                                    props.history.push("/login")

                            }}>
                                Logout
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