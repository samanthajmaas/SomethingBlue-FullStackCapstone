import React, { useContext, useState } from "react"
import { EditGuestForm } from "./EditGuestForm";
import { GuestContext } from "./GuestProvider";

export const Guest = (props) => {
    const { deleteGuest, updateGuest } = useContext(GuestContext)
    const [editMode, setEditMode] = useState(false)

    return (
        <>
            <section className="guest">
                <>
                    <button className="btn-small fa fa-trash" onClick={() => deleteGuest(props.guest)}>X</button>
                    <div className="guest-name">{props.guest.guest_first_name} {props.guest.guest_last_name}</div>
                    <div className="address">{props.guest.address}</div>
                    <div className="phone">{props.guest.phone_number}</div>
                    <div className="numberOfGuests">{props.guest.number_of_guests_in_party}</div>
                    <div className="rsvpStatus">{props.guest.rsvp_status}</div>
                    <button className="btn-small fa fa-edit" onClick={() => setEditMode(true)}>edit</button>
                    {editMode ? 
                    <EditGuestForm key={props.guest.id} guest={props.guest} setEditMode={setEditMode} {...props}/>
                    :
                    null
                    }
                </>
            </section>
        </>
    )
}