import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { createActivity, getAllCountries } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import '../Activity/Activity.css';
import '../Filter/Filter.css'


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

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (name === 'countriesName'){
            if (!activity.countriesName.includes(value)) {
            setActivity({
                // ACA SE PUEDE HACER UN MAP PARA QUE SI YA EXISTE ESE PAIS, NO SE REPITA
                ...activity,
                [name]: [...activity.countriesName, value]
            })}
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
        <div>
            <NavBar />
            <h1>Create Activity</h1>
            <hr/>
            <div className="create-activity">
                <form action="" >
                    <label htmlFor="name">Activity name: </label>
                    <input
                        className={errors.name ? 'error2' : "input"}
                        type="text" name='name' id='name'
                        value={activity.name}
                        placeholder='Activity...'
                        onChange={handleChange}
                    />
                    {errors.name && (<span className="danger">{errors.name}</span>)}
                    <br /> <br />
                    <label htmlFor="difficulty">Difficulty:</label>
                    <label className={errors.difficulty ? 'error' : "filter"}>
                        <select
                        name="difficulty" id="difficulty"
                        onChange={handleChange}
                        >
                            <option value="">Select Difficulty</option>
                            <option value="1">1 - Easy</option>
                            <option value="2">2 - Upper Easy</option>
                            <option value="3">3 - Medium</option>
                            <option value="4">4 - Advanced</option>
                            <option value="5">5 - Hard</option>
                        </select>
                    </label>
                    {errors.difficulty && (<span className="danger">{errors.difficulty}</span>)}
                    <br /> <br />
                    <label htmlFor="duration">Duration (hs.):</label>
                    <input
                    className={errors.duration ? 'error2' : "input"}
                    type="text" name="duration" id="duration"
                    value={activity.duration}
                    placeholder='Duration...'
                    onChange={handleChange}
                    />
                    {errors.duration && (<span className="danger">{errors.duration}</span>)}
                    <br /> <br />
                    <label htmlFor="season">Season: </label>
                    <label className={errors.season ? 'error' : "filter"}>
                        <select
                        name="season" id="season" 
                        onChange={handleChange}
                        >
                            <option value="">Select Season</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="All the year">All the year</option>
                        </select>
                    </label>
                    {errors.season && (<span className="danger">{errors.season}</span>)}
                    <br /><br />
                    <label htmlFor="countriesName">Countries for this activity:</label>
                    <label className={errors.countriesName ? "error3" : "activity-countries"}>
                        <select
                        name="countriesName" id="countrt"
                        onChange={handleChange}
                        >
                            <option value="">Please select country</option>
                            {countries?.map(c => {
                                return <option value={c.name} key={c.id}>{c.name}</option>
                            })}
                        </select>
                    </label>
                    {!activity.countriesName.length && (<span className="danger">{errors.countriesName}</span>)}
                    {/* ACA HAY QUE PONER UN TEXTO O IMAGEN DE CADA UNO DE LOS PAISES QUE SE AGREGA
                        SE PUEDE HACER UN MAP DEL ESTADO COUNTRIESNAME */}
                    <br />
                    {
                    activity.countriesName.length ?
                    activity.countriesName.map(c => {
                        return <span key={c}>
                            <button
                            className="borrar" onClick={handleCancel} value={c}
                            >x </button>
                            {c} - </span>
                    })
                    : <span></span>
                    }
                    <br /><br />
                    <button className="boton" onClick={handleSubmit}>Create Activity</button>
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