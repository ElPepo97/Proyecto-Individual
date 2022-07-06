import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions/actions";
import '../SearchBar/SearchBar.css'


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

    return (
        <div>
            <input
                className="search"
                type='text'
                placeholder="Country..."
                name="search"
                onChange={handleChange}
            />
            <button className="boton" name="search" onClick={handleSubmit}>Search</button>
        </div>
    )

}