import React from "react";
import { Link } from 'react-router-dom';
import './CountryCard.css'


const CountryCard = ({id, name, flag, region}) => {

    return (
        <div className="card">
            <div className="card-body">
                <h3 >
                    <Link to={`/countries/${id}`} className="card-title" >{name}</Link>
                </h3>
                <img src={flag} alt={'Flag not found'} className='imagen' />
                <h3 className="region">Region: {region}</h3>
            </div>
        </div>

    );
};

export default CountryCard;