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
            <div className="guestlist-cont">
                <section className="guests">
                <h2>Guest List</h2>
                <div className="number of guests">"NUMBER OF GUESTS"</div>
                    <button className="addItem" onClick={() => {
                        setAddMode(true)
                    }}>add guests</button>
                <div>
                    {addMode
                        ? <NewGuestForm
                            setAddMode={setAddMode}
                            {...props} />
                    : null}
                </div>
                <div className="theguests">
                    {guests.map(g => {
                        return <Guest
                            key={g.id}
                            guest={g}
                            {...props} />
                    })
                    }
                </div>
                </section>
            </div>
        </>
    )
}