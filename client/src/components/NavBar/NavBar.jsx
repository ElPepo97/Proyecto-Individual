import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import '../NavBar/NavBar.css';
import { changeBackgroundColor } from '../../redux/actions/actions';
import Switch from '@material-ui/core/Switch';
import { BsMoonFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";


const NavBar = () => {
    const dispatch = useDispatch();
    const oscuro = useSelector(state => state.oscuro)

    const handleFondo = () => {
        dispatch(changeBackgroundColor());
    };

    return (
        <div className="barra">
            <Link className="texto" to='/countries'>
                <span className={(window.location.pathname === '/countries') ? 'barra2' : "barra1"}>Home</span>
            </Link>
            <Link className="texto" to='/activity'>
                <span className={(window.location.pathname === '/activity') ? 'barra2' : "barra1"}>Create Activity</span>
            </Link>
            <Link className="texto" to='/play'>
                <span className={(window.location.pathname === '/play') ? 'barra2' : "barra1"}>Let's play!</span>
            </Link>
            <div className='walpaper-changer'>
                <FaSun />
                <Switch
                    checked={oscuro}
                    onChange={handleFondo}
                    name="oscuro"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                <BsMoonFill />
            </div>
        </div>
    )
};

export default NavBar;