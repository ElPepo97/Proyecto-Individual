import React from "react";
import Pagination from '@mui/material/Pagination';
import './pagination.css';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff"
      }
    }
}));

const useStylesClaro = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#000"
      }
    }
}));

const PaginationComponent = ({ countriesPerPage, totalCountries, handlePage, currentPage }) => {
    const pageNumbers = [];
    const classes = useStyles();
    const classesClaro = useStylesClaro();
    const oscuro = useSelector(state => state.oscuro);
    
    for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div id="pagination" >
            <Stack>
                <Pagination
                    color="primary"
                    count={pageNumbers.length}
                    page={currentPage}
                    onChange={handlePage}
                    classes={oscuro ? { ul: classes.ul } : { ul: classesClaro.ul }}
                />
            </Stack>
        </div>
    );
};

export default PaginationComponent;