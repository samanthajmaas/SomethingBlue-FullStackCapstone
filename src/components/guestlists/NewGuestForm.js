import React, {useContext, useState } from "react"
import { GuestContext } from "./GuestProvider"

export const  NewGuestForm= (props) => {
    const {addGuest} = useContext(GuestContext)

    const [guest, setGuest] = useState({
        guest_first_name: "",
        guest_last_name:"",
        address:"",
        phone_number:"",
        rsvp_status:""
    })

    const handleControlledInputChange = (e) => {
        const newGuest = Object.assign({}, guest)
        newGuest[e.target.name] = e.target.value
        setGuest(newGuest)
    }

    const constructNewGuest = () => {
        addGuest(guest)
            .then(() => props.setAddMode(false))
    }

    return (
        <form className="form newGuestForm" id="newGuestForm">
            <div className="toprow">
                <span className="x cancel-new-guest" onClick={()=>{
                    props.setAddMode(false)
                }}>X</span>
            </div>
            <h2 className="newGuestForm_label">add new guest</h2>
            <div className="form-cont">
                <div className="left-three">
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
                </div>
                <div className="right-three">
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
                                placeholder="# in party"
                                onChange={handleControlledInputChange}>
                            </input>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-div rsvp-status">
                                <select name="rsvp_status" className="form-control" id="rsvp"
                                    proptype=""
                                    value={guest.rsvp_status}
                                    onChange={handleControlledInputChange}>
                                    <option className="option">RSVP Status...</option>
                                    <option className="option">invited</option>
                                    <option className="option">attending</option>
                                    <option className="option">declined</option>
                                </select>
                        </div>
                    </fieldset>
                </div>
            </div>
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