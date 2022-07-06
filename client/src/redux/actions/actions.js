import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const ORDERED_COUNTRIES = 'ORDERED_COUNTRIES';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const FILTER_REGION = 'FILTER_REGION';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';


export const getAllCountries = (name) => {
    return async function (dispatch) {
        if (name) {
            try {
                const response = await axios.get(`http://localhost:3001/countries?name=${name}`)
                dispatch({ type: GET_ALL_COUNTRIES, payload: response.data })
            } catch (error) {
                console.log(error);
            };
        }
        else {
            try {
                const response = await axios.get('http://localhost:3001/countries')
                dispatch({ type: GET_ALL_COUNTRIES, payload: response.data })
            } catch (error) {
                console.log(error);
            };
        }
    }
};

export const getCountryDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/countries/${id}`)
            dispatch({ type: GET_COUNTRY_DETAIL, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export const createActivity = (data) => {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/activities', data)
            dispatch({ type: CREATE_ACTIVITY, payload: response.data })
        } catch (error) {
            console.log(error)
        }
    }
};

export const orderedCountries = (payload) => {
    return function (dispatch) {
        dispatch({
            type: ORDERED_COUNTRIES,
            payload
        })
    }
};

export const getAllActivities = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/activities')
            dispatch({ type: GET_ALL_ACTIVITIES, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export const filterRegion = (payload) => {
    return function (dispatch) {
        dispatch({
            type: FILTER_REGION,
            payload
        })
    }
};

export const filterActivity = (payload) => {
    return function (dispatch) {
        dispatch({
            type: FILTER_ACTIVITY,
            payload
        })
    }
};