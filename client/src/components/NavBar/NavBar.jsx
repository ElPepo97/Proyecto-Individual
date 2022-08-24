import React, { Component } from "react";
import { Link } from 'react-router-dom'
import '../NavBar/NavBar.css'


export default class NavBar extends Component {
    render() {
        return (
            <div className="barra">
                <Link className="texto" to='/countries'><span className="barra1">Home</span></Link>
                <Link className="texto" to='/activity'><span className="barra2">Create Activity</span></Link>
                <Link className="texto" to='/play'><span className="barra3">Let's play!</span></Link>
            </div>
        )
    }
}