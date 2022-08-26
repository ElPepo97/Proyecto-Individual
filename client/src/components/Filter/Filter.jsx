import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRegion, filterActivity } from '../../redux/actions/actions';
import '../Filter/Filter.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Filter ({ handleSort, handlePage }) {
    const filterActivities = useSelector(state => state.activities)
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('')

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

<FormControl sx={{ m: 2, minWidth: 120 }} size="small" color="secondary">
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

        <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
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

            {/* <label className="filter" >
                <select onChange={c => handleRegion(c)}>
                    <option value=''>Filter by region</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='all'>All countries</option>
                </select>
            </label> */}

<FormControl sx={{ m: 2, minWidth: 180 }} size="small">
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

            {/* <label className="filter">
                <select onChange={c => handleFilter(c)}>
                    <option value=''>Filter by activity</option>
                    <option value='all'>All countries</option>
                </select>
            </label> */}
       </div>
    )
}