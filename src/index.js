import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Blue } from "./components/Blue.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Blue />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
