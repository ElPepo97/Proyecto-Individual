import React from "react";
import { Link } from 'react-router-dom';
import './CountryCard.css'


const CountryCard = ({id, name, flag, region, capital}) => {

    return (
        <div>
        {
            flag ?
            <div className="card">
                <Link to={`/countries/${id}`} className="card-title" >
                <div className="card-header animated-bg" id="header">
                    <img src={flag} alt={'Flag not found'} className='imagen' />
                </div>
                <div className="card-content">
                    <div className="h3">{name}</div>
                    <div className="region">Region: {region}</div>
                    <div className="region">Capital: {capital}</div>
                </div>
                </Link>
            </div>
            : <div className="card">
                <div className="card-header animated-bg" id="header">&nbsp;</div>
                <div className="card-content">
                    <h3 className="card-title animated-bg animated-bg-text" id="title">
                        &nbsp;
                    </h3>
                    <p className="card-excerpt" id="excerpt">&nbsp;
                        <span className="animated-bg animated-bg-text">&nbsp;</span>
                        <span className="animated-bg animated-bg-text">&nbsp;</span>
                        <span className="animated-bg animated-bg-text">&nbsp;</span>
                    </p>
                </div>
            </div>
        }
        </div>
    );
};

export default CountryCard;
