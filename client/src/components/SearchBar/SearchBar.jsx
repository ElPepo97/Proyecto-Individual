import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions/actions";
import '../SearchBar/SearchBar.css'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


export default function SearchBar ({ handlePage }) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getAllCountries(search))
        setSearch('')
        handlePage(1)
    }

console.log(search)
    return (
        <div>
            <form noValidate autoComplete="off">
                <Input
                    placeholder="Country name..."
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={handleChange}
                    // onSubmit={handleSubmit}
                    size='small'
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} size='small'>
                    Search
                </Button>
            </form>
        </div>
    )

}