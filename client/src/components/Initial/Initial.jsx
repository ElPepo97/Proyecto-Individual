import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../Initial/Initial.css'


export default class Initial extends Component {
    render() {
        return (
            <div className="landing">
                <h1>Let's explore the... </h1>
                <h1 className="initial">WORLD</h1>
                <br />
                <Link className="world" to='/countries'><button className="entry"><span className="flechita">➡</span></button></Link>
            </div>
        )
    }
}