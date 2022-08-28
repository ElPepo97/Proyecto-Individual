import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRegion, filterActivity } from '../../redux/actions/actions';
import '../Filter/Filter.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#f5eeee',
    border: 0,
    borderRadius: 4,
    color: 'black',
    height: 40,
    width: 180,
  },
});


export default function Filter ({ handleSort, handlePage }) {
    const filterActivities = useSelector(state => state.activities)
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const classes = useStyles();

    function handleRegion (event) {
        event.preventDefault();
        handlePage(1);
        if (event.target.value){
            dispatch(filterRegion(event.target.value))
        }
    }

    function handleFilter (event) {
        event.preventDefault();
        handlePage(1);
        if (event.target.value){
            dispatch(filterActivity(event.target.value))
        }
        setFilter(event.target.value);
    }
    
  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 120 }} size="small" className={classes.root}>
        <InputLabel id="demo-simple-select-autowidth-label">Order by...</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filter}
          onChange={handleSort}
          autoWidth
          label="Order by..."
        >
          <MenuItem value={'az'} >A-Z</MenuItem>
          <MenuItem value={'za'} >Z-A</MenuItem>
          <MenuItem value={'more'} >Higher population</MenuItem>
          <MenuItem value={'less'} >Lower Population</MenuItem>
        </Select>
      </FormControl>

        <FormControl sx={{ m: 2, minWidth: 180 }} size="small" className={classes.root}>
        <InputLabel id="demo-simple-select-autowidth-label">Filter by region</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={filter}
          onChange={handleRegion}
          autoWidth
          label="Filter by region"
        >
          <MenuItem value='Africa'>Africa</MenuItem>
          <MenuItem value='Americas'>Americas</MenuItem>
          <MenuItem value='Antarctic'>Antarctic</MenuItem>
          <MenuItem value='Asia'>Asia</MenuItem>
          <MenuItem value='Europe'>Europe</MenuItem>
          <MenuItem value='Oceania'>Oceania</MenuItem>
          <MenuItem value='all'>All countries</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 2, minWidth: 180 }} size="small" className={classes.root}>
        <InputLabel id="demo-simple-select-autowidth-label">Filter by activity</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value=''
          onChange={handleFilter}
          autoWidth
          label="Filter by activity"
        >
          <MenuItem value='all'>All countries</MenuItem>
                    {
                        filterActivities !== 'No hay actividades' &&
                        filterActivities.map(a => {
                            return (
                                <MenuItem value={a.name} key={a.id}>{a.name}</MenuItem>
                            )
                        }) 
                    }
        </Select>
      </FormControl>
    </div>
  )
}