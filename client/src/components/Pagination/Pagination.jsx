import React from "react";
import {useSelector} from 'react-redux';
import '../Pagination/Pagination.css';


const Pagination = ({ countriesPerPage, totalCountries, handlePage }) => {
    const countries = useSelector(state => state.countries)
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    if (countries.length === 250) pageNumbers.push(26)

    return (
        <nav>
            <button className="pagination" onClick={() => handlePage('-')}>◀</button>
                {pageNumbers.map(n => (
                        <button className="pagination" onClick={() => handlePage(n)} key={n} >
                            {n}
                        </button>   
                ))}
            <button className="pagination" onClick={() => handlePage('+')}>▶</button>
        </nav>
    );
};

export default Pagination;