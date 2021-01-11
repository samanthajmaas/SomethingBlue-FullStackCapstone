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

    const totalInvited = () => {
        const partyNumbers = []
        const mapping = guests.map(g => 
            partyNumbers.push(g.number_of_guests_in_party))
        let sum = 0
        for (let num of partyNumbers){
            sum = sum + num
        } 
        return sum
    }

    const totalAttending = () => {
        const attendingNumbers = []
        const guestsWhoAttending = guests.filter(g => g.rsvp_status === "attending")
        const mapped = guestsWhoAttending.map(attender => attendingNumbers.push(attender.number_of_guests_in_party))
        let sum = 0
        for (let num of attendingNumbers){
            sum = sum + num
        } 
        return sum
    }

    return (
        <>
        <div className="guest-list-page">
            <article className="guestlist-cont">
                <section className="guestList-right">
                    <h2 className="guestListTitle">Guest List</h2>
                    <div className="totalnumberOfGuests">
                        {totalInvited()} total guests : {totalAttending()} guests attending
                    </div>
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
                        : 
                        null}
                    </div>
                </section>
                </article>
                {addMode ?
                <article className="bottom-section" style={{ marginTop: '30em' }}>
                <section className="theguests">
                    {guests.map(g => {
                        return <Guest
                            key={g.id}
                            guest={g}
                            {...props} />
                    })
                    }
                </section>
            </article>
                :
                <article className="bottom-section">
                    <section className="lables">
                        <div className="nameLable lable">Name</div>
                        <div className="addressLable lable">Address</div>
                        <div className="phoneLable lable">Phone Number</div>
                        <div className="partyLable lable"># in party</div>
                        <div className="rsvpLable lable">RSVP Status</div>
                        <div className="update lable">Update List</div>
                    </section>
                    <section className="theguests">
                        {guests.map(g => {
                            return <Guest
                                key={g.id}
                                guest={g}
                                {...props} />
                        })
                        }
                    </section>
                </article>
                }
                
            </div>
        </>
    )
}