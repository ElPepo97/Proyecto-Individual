import React from "react";
import '../Pagination/Pagination.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const PaginationComponent = ({ countriesPerPage, totalCountries, handlePage, currentPage }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='pagination'>
            <Stack>
                <Pagination color="primary" count={pageNumbers.length} page={currentPage} onChange={handlePage} />
            </Stack>
        </div>
    );
};

export default PaginationComponent;