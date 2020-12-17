import React, { useContext } from "react"
import { GuestContext } from "./GuestProvider";

export const Guest = (props) => {
    const { deleteGuest, updateGuest } = useContext(GuestContext)

    return (
        <>
            <section className="guest">
                <>
                    {/* {
                        props.editMode ? 
                    
                        <button className="btn-small fa fa-trash" onClick={() => deleteChecklistItem(props.item)}>X
                        </button> :
                        null
                    } */}
                    <div className="guest-name">{props.guest.guest_first_name} {props.guest.guest_last_name}</div>
                    <div className="address">{props.guest.address}</div>
                    <div className="phone">{props.guest.phone_number}</div>
                    <div className="numberOfGuests">{props.guest.number_of_guests_in_party}</div>
                    <div className="rsvpStatus">{props.guest.rsvp_status}</div>
                </>
            </section>
        </>
    )
}