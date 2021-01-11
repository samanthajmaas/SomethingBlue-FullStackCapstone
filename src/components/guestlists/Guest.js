import React, { useContext, useState } from "react"
import { EditGuestForm } from "./EditGuestForm";
import { GuestContext } from "./GuestProvider";

export const Guest = (props) => {
    const { deleteGuest } = useContext(GuestContext)
    const [editMode, setEditMode] = useState(false)

    return (
        <>
            <section className="guest">
                <>
                    <div className="guest-name">{props.guest.guest_first_name} {props.guest.guest_last_name}</div>
                    <div className="address">{props.guest.address}</div>
                    <div className="phone">{props.guest.phone_number}</div>
                    <div className="numberOfGuests">{props.guest.number_of_guests_in_party}</div>
                    <div className="rsvp">{props.guest.rsvp_status}</div>
                    <button className="btn guest-btn edit-guest-bnt" onClick={() => setEditMode(true)}>edit</button>
                    <button className="btn guest-btn" onClick={() => deleteGuest(props.guest)}>delete</button>
                </>
            </section>
                {editMode ?
                    <EditGuestForm key={props.guest.id} guest={props.guest} setEditMode={setEditMode} {...props} />
                    :
                    null
                }

        </>
    )
}