import React, { useContext, useEffect, useState } from "react"
import { Guest } from "./Guest"
import { GuestContext } from "./GuestProvider"
import { NewGuestForm } from "./NewGuestForm"
import "./Guest.css"

export const GuestList = (props) => {
    const { guests, getGuests } = useContext(GuestContext)
    const [addMode, setAddMode] = useState(false)

    useEffect(() => {
        getGuests()
    }, [])

    return (
        <>
        <div className="guest-list-page">
            <article className="guestlist-cont">
                <section className="guestList-right">
                    <h2 className="guestListTitle">Guest List</h2>
                    <div className="numberOfGuests">"NUMBER OF GUESTS"</div>
                </section>
                <section className="guestList-left">
                    <button className="btn" onClick={() => {
                        setAddMode(true)
                    }}>add guests</button>
                    <div>
                        {addMode
                            ? <NewGuestForm
                                setAddMode={setAddMode}
                                {...props} />
                        : null}
                    </div>
                </section>
                </article>
                <section className="theguests">
                    {guests.map(g => {
                        return <Guest
                            key={g.id}
                            guest={g}
                            {...props} />
                    })
                    }
                </section>
            </div>
        </>
    )
}