import React from "react";
import '../Pagination/Pagination.css';


const Pagination = ({ countriesPerPage, totalCountries, handlePage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

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