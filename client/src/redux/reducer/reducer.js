import { GET_ALL_COUNTRIES,
        GET_COUNTRY_DETAIL,
        CREATE_ACTIVITY,
        ORDERED_COUNTRIES,
        GET_ALL_ACTIVITIES,
        FILTER_REGION,
        FILTER_ACTIVITY
    } from '../actions/actions'


const initialState = {
    countries: [],
    countries2: [],
    countryDetail: [],
    activities: [],
    filteredCountries: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                countries2: action.payload.length >= 250 ? action.payload : state.countries2
            };
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload,
            };
        case CREATE_ACTIVITY: 
            return state;
        case ORDERED_COUNTRIES:
            let filter = state.countries;
            switch (action.payload) {
                case 'az':
                        filter = filter.sort((a, b) => a.name > b.name ? 1 : -1)
                break;
                case 'za':
                        filter = filter.sort((a, b) => a.name > b.name ? 1 : -1).reverse()
                break;        
                case 'more':
                        filter = filter.sort((a, b) => a.population - b.population).reverse()
                break;
                case 'less':
                        filter = filter.sort((a, b) => a.population - b.population)
                break;
                default:
            }
            return {
                ...state,
                countries: filter
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            }
        case FILTER_REGION:            
            state.countries = state.countries2;
            if (action.payload === 'all') {
                return {
                    ...state,
                    countries: state.countries
                }
            }
            const region = state.countries.filter(c => c.region === action.payload)
            return {
                ...state,
                // filteredCountries: region
                countries: region
            }
        case FILTER_ACTIVITY:
            state.countries = state.countries2;
            if (action.payload === 'all') {
                return {
                    ...state,
                    countries: state.countries
                }
            }
            let paises = state.countries.filter(c => c.activities.length > 0);
            let activity = [];
            for (let i = 0; i < paises.length; i++) {
                for (let j = 0; j < paises[i].activities.length; j++) {
                    if (paises[i].activities[j].name === action.payload) {
                        activity.push(paises[i])
                    }
                }
            }
            return {
                ...state,
                countries: activity
            }
        default:
            return state;
    }
}

export default rootReducer;