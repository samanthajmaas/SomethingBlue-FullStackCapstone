import React, {useContext, useState } from "react"
import { GuestContext } from "./GuestProvider"

export const  EditGuestForm= (props) => {
    const { updateGuest } = useContext(GuestContext)

    const [guest, setGuest] = useState({
        id:props.guest.id,
        guest_first_name: props.guest.guest_first_name,
        guest_last_name: props.guest.guest_last_name,
        address: props.guest.address,
        phone_number:props.guest.phone_number,
        number_of_guests_in_party: props.guest.number_of_guests_in_party,
        rsvp_status: props.guest.rsvp_status
    })

    const handleControlledInputChange = (e) => {
        const newGuest = Object.assign({}, guest)
        newGuest[e.target.name] = e.target.value
        setGuest(newGuest)
    }

    const constructNewGuest = () => {
        updateGuest(guest)
            .then(() => props.setEditMode(false))
    }

    return (
        <form className="form editGuestForm" id="editGuestForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    props.setEditMode(false)
                }}>X</span>
            </div>
            <h2 className="newGuestForm_label">edit guest</h2>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="guest_first_name" className="form-control firstname-input" id="first_name"
                        defaultValue={guest.guest_first_name}
                        placeholder="first name"
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="guest_last_name" className="form-control lastname-input" id="last_name"
                        defaultValue={guest.guest_last_name}
                        placeholder="last name"
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="address" className="form-control address-input" id="address"
                        defaultValue={guest.address}
                        placeholder="address"
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="phone_number" className="form-control phone-input" id="phone"
                        defaultValue={guest.phone_number}
                        placeholder="phone number"
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <input type="text" name="number_of_guests_in_party" className="form-control guestnumber-input" id="numberOfGuests"
                        defaultValue={guest.number_of_guests_in_party}
                        placeholder="How many guests in this party?"
                        onChange={handleControlledInputChange}>
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-div">
                    <label htmlFor="rsvp">RSVP status</label>
                        <select name="rsvp_status" className="form-control" id="rsvp"
                            proptype=""
                            value={guest.rsvp_status}
                            onChange={handleControlledInputChange}>
                            <option>invited</option>
                            <option>attending</option>
                            <option>declined</option>
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    constructNewGuest()
                }}
                className="btn post_submit_btn">
                save
            </button>

        </form>
    )
}