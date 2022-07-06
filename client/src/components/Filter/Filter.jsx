import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRegion, filterActivity } from '../../redux/actions/actions'
import '../Filter/Filter.css'


export default function Filter ({ handleSort, handlePage }) {
    const filterActivities = useSelector(state => state.activities)
    const dispatch = useDispatch();

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
    }
    
    return (
        <div>
            <label className="filter">
                <select onChange={(c) => handleSort(c)}>
                    <option value='' >Order by...</option>
                    <option value='az' >A-Z</option>
                    <option value='za' >Z-A</option>
                    <option value='more' >Most population</option>
                    <option value='less' >Less Population</option>
                </select>
            </label>
            <label className="filter" >
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
            </label>

            <label className="filter">
                <select onChange={c => handleFilter(c)}>
                    <option value=''>Filter by activity</option>
                    <option value='all'>All countries</option>
                    {
                        filterActivities !== 'No hay actividades' &&
                        filterActivities.map(a => {
                            return (
                                <option value={a.name} key={a.id}>{a.name}</option>
                            )
                        }) 
                    }
                </select>
            </label>
       </div>
    )
}