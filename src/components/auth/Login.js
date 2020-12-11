import React, { useRef, useContext} from "react"
import { Link } from "react-router-dom"
import { BrideContext } from "../brides/BrideProvider"
import "./Auth.css"

export const Login = (props) => {
    const username = useRef(null)
    const password = useRef(null)
    const invalidDialog = useRef(null)

    const {setLoggedIn, getCurrentBride, currentBride } = useContext(BrideContext)

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    setLoggedIn(true)
                    localStorage.setItem("blue_token", res.token)
                    props.history.push("/blue");
                }
                else {
                    invalidDialog.current.showModal();
                }
            })
        }



    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Something Blue</h1>
                    <img className="login-img" src="https://via.placeholder.com/300x150.png"></img>
                    <fieldset>
                        <input
                            ref={username}
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required
                            autoFocus />
                    </fieldset>
                    <fieldset>
                        <input ref={password}
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn login-button" type="submit">Login</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}