import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { createActivity, getAllCountries } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import '../Activity/Activity.css';
import '../Filter/Filter.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Activity () {
    const [activity, setActivity] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countriesName: []
    })
    const [errors, setErrors] = useState({})
    const countries = useSelector(state => state.countries2)
    const dispatch = useDispatch();
    const oscuro = useSelector(state => state.oscuro)

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'countriesName'){
            if (!activity.countriesName.includes(value)) {
                setActivity({
                    ...activity,
                    [name]: [...activity.countriesName, value]
                })
            }
        } else {
            setActivity({
                ...activity,
                [name]: value
            })
        }
        setErrors(validate({
            ...activity,
            [name]: value
        }))
    }

    useEffect (() => {
        if (!countries.length) {
            dispatch(getAllCountries())
        }
    }, [dispatch, countries.length])

    function handleSubmit(event) {
        event.preventDefault();
        if(!Object.keys(errors).length && activity.season && activity.countriesName.length) {
            dispatch(createActivity(activity));
            alert('Activity created sucessfully')
            setActivity({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                countriesName: []
            })
        } else {
            alert('Please complete all fields')
        }
    }

    function handleCancel(event) {
        event.preventDefault();
        setActivity({
            ...activity,
            countriesName: activity.countriesName.filter(c => c !== event.target.value)
        })
    }

    return (
        <div className={oscuro ? "general" : 'generalClaro'}>
            <NavBar />
            <h1>Create Activity</h1>
            <hr/>
            <div className={oscuro ? "create-activity" : 'create-activity-claro'}>


            <form noValidate autoComplete="off">
                <Input
                    placeholder="Activity name..."
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={handleChange}
                    size='small'
                    name="name"
                />
                <br />
                {errors.name && (<span className="danger">{errors.name}</span>)}
                <br /><br />
                
                <FormControl sx={{  minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Difficulty</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value=''
                        onChange={handleChange}
                        autoWidth
                        label="Difficulty"
                        name={activity.difficulty}
                    >
                        <MenuItem value="1" >1 - Easy</MenuItem>
                        <MenuItem value="2" >2 - Upper Easy</MenuItem>
                        <MenuItem value="3" >3 - Medium</MenuItem>
                        <MenuItem value="4" >4 - Advanced</MenuItem>
                        <MenuItem value="5" >5 - Hard</MenuItem>
                    </Select>
                </FormControl>
                <br />
                {errors.difficulty && (<span className="danger">{errors.difficulty}</span>)}
                <br /><br />
                
                <Input
                    placeholder="Duration (hs.)"
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={handleChange}
                    name='duration'
                    size='small'
                />
                <br />
                {errors.duration && (<span className="danger">{errors.duration}</span>)}
                <br /><br />

                <FormControl variant="outlined" sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Season</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value=''
                        onChange={handleChange}
                        autoWidth
                        label="Season"
                        name="season"
                    >
                        <MenuItem value="Autumn">Autumn</MenuItem>
                        <MenuItem value="Spring">Spring</MenuItem>
                        <MenuItem value="Summer">Summer</MenuItem>
                        <MenuItem value="Winter">Winter</MenuItem>
                        <MenuItem value="All the year">All the year</MenuItem>
                    </Select>
                </FormControl>
                <br />
                {errors.season && (<span className="danger">{errors.season}</span>)}
                <br /><br />

                <FormControl sx={{ minWidth: 240 }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">Countries for this activity</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value=''
                        onChange={handleChange}
                        autoWidth
                        label="Countries for this activity"
                        name="countriesName"
                    >
                        {countries?.map(c => {
                                return <MenuItem value={c.name} key={c.id}>{c.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <br />
                {!activity.countriesName.length && (<span className="danger">{errors.countriesName}</span>)}
                                    {
                                        activity.countriesName.length ?
                    activity.countriesName.map(c => {
                        return <span key={c}>
                            <button
                            className="borrar" onClick={handleCancel} value={c}
                            >x </button>
                            {c} - </span>
                    })
                    : null
                }
                <br /><br />

                <Button variant="contained" color="primary" onClick={handleSubmit} size='small'>
                    Create Activity
                </Button>
            </form>
            </div>
        </div>
    )

}

function validate(activity) {
    let errors = {}
    if (!activity.name) errors.name = 'Please type a name';
    if (!activity.difficulty) errors.difficulty = 'Please select difficulty';
    if (!activity.duration) errors.duration = 'Please type the duration';
    else if (!/^[0-9]*(\.?)[ 0-9]+$/.test(activity.duration)) errors.duration = 'Please type only numbers';
    else if (activity.duration < 0 || activity.duration > 72) errors.duration = 'Duration must be lower than 72 hours'
    if (!activity.season) errors.season = 'Please select a season';
    if (!activity.countriesName?.length) errors.countriesName = 'Please select a country';

    return errors;
}

export default Activity;