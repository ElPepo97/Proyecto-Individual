import { useSelect } from "@mui/base";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import '../NavBar/NavBar.css'
import { changeBackgroundColor } from '../../redux/actions/actions'


const NavBar = () => {
    const dispatch = useDispatch();

    const handleFondo = () => {
        dispatch(changeBackgroundColor())
    }

    return (
        <div className="barra">
            <Link className="texto" to='/countries'><span className="barra1">Home</span></Link>
            <Link className="texto" to='/activity'><span className="barra2">Create Activity</span></Link>
            <Link className="texto" to='/play'><span className="barra3">Let's play!</span></Link>
            <button onClick={handleFondo} className='walpaper-changer'>
                fondo
            </button>
        </div>
    )
};

export default NavBar;