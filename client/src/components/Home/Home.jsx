import React, { Component } from "react";
import {connect} from 'react-redux';
import { getAllCountries, orderedCountries, getAllActivities } from "../../redux/actions/actions";
import CountryCard from '../CountryCard/CountryCard.jsx'
import NavBar from "../NavBar/NavBar";
import Filter from '../Filter/Filter'
import SearchBar from "../SearchBar/SearchBar";
import './Home.css';
import PaginationComponent from "../Pagination/Pagination";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            countriesPerPage: 10,
        }
        this.handlePage = this.handlePage.bind(this); // PARA ACTUALIZAR CORRECTAMENTE EL ESTADO SE PUEDE HACER ASI O
                                                    //PASANDO LA FUNCION EN DONDE SE CAMBIA EL ESTADO COMO ARROW FUNCTION
    }

    componentDidMount() {
        this.props.getAllCountries()
        this.props.getAllActivities()
    }

    handleSort(event) {
        event.preventDefault();
        this.handlePage(1)
        if (event.target.value) {
            this.props.orderedCountries(event.target.value)
        }
    }

    handlePage(pageNumber, value) { 
        if (value) {
            this.setState({
                currentPage: value 
            })
        } else {
            this.setState({
                currentPage: pageNumber 
            })
        }
    }

    render() {
        const indexOfLastCountry = this.state.currentPage * this.state.countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - this.state.countriesPerPage;
        const currentCountries = this.props.countries.slice(indexOfFirstCountry, indexOfLastCountry);
        
        return (
            <div className={this.props.oscuro ? 'general2' : "generalClaro2"}>
                <div className={this.props.oscuro ? 'homeOscuro' : 'pepito'}>
                <NavBar />
                <h1 className={this.props.oscuro ? 'tituloOscuro' : "titulo"}>Countries</h1>
                    <SearchBar handlePage={this.handlePage}/>
                    <Filter handleSort={e => this.handleSort(e)} handlePage={this.handlePage}/>  
                </div>
                <hr/>
                <div className="cards">
                {/* {
                currentCountries ? */}
                {currentCountries.map(c => {
                    return <CountryCard
                        id={c.id}
                        name={c.name}
                        flag={c.flag}
                        region={c.region}
                        capital={c.capital}
                        key={c.id}
                    />
                })}
                {/* : <h2>Sorry, couldn't find any country :(</h2> */}
                {/* } */}
                </div>
                <PaginationComponent
                countriesPerPage={this.state.countriesPerPage}
                totalCountries={this.props.countries.length}
                handlePage={this.handlePage}
                currentPage={this.state.currentPage}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        countries: state.countries,
        activities: state.activities,
        oscuro: state.oscuro
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: name => dispatch(getAllCountries(name)),
        orderedCountries: value => dispatch(orderedCountries(value)),
        getAllActivities: () => dispatch(getAllActivities())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)