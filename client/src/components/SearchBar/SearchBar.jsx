import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions/actions";
import '../SearchBar/SearchBar.css'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#f5eeee',
    border: 0,
    borderRadius: 4,
    color: 'black',
    height: 37,
    paddingLeft: 12,
    marginRight: 20,
    width: 250,
  },
});


export default function SearchBar ({ handlePage }) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const classes = useStyles();

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
            <form>
                <Input
                    placeholder="Country name..."
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={handleChange}
                    size='small'
                    className={classes.root}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} size='small'>
                    Search
                </Button>
            </form>
        </div>
    )

}