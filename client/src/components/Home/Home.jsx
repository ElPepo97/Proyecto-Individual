import React, { Component } from "react";
import {connect} from 'react-redux';
import { getAllCountries, orderedCountries, getAllActivities } from "../../redux/actions/actions";
import CountryCard from '../CountryCard/CountryCard.jsx'
import NavBar from "../NavBar/NavBar";
import Filter from '../Filter/Filter'
import SearchBar from "../SearchBar/SearchBar";
import './Home.css';
import Pagination from "../Pagination/Pagination";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
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
        this.forceUpdate()
    }

    handlePage(pageNumber) { 
        if (pageNumber === '+') {
            if (this.state.currentPage === 25){
                return;
            }
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
        else if (pageNumber === '-') {
            if (this.state.currentPage === 0){
                return;
            }
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
        else {
            this.setState({
                currentPage: pageNumber - 1
            })
        }
    }

    render() {
        const countriesInFirstPage = this.props.countries.slice(0, 9);
        const restCountries = this.props.countries.slice(9);
        const indexOfLastCountry = this.state.currentPage * this.state.countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - this.state.countriesPerPage;
        if (this.state.currentPage === 0) {
            var currentCountries = countriesInFirstPage
        } else {
            var currentCountries = restCountries.slice(indexOfFirstCountry, indexOfLastCountry);
        }
        
        return (
            <div>
                <NavBar />
                <h1 className="titulo">Countries</h1>
                <div>
                    <SearchBar handlePage={this.handlePage}/>
                    <Filter handleSort={e => this.handleSort(e)} handlePage={this.handlePage}/>  
                </div>
                <hr/>
                <div className="cards">
                {
                this.props.countries.length ?
                currentCountries.map(c => {
                    return <CountryCard
                        id={c.id}
                        name={c.name}
                        flag={c.flag}
                        region={c.region}
                        key={c.id}
                    />
                })
                : <h2>Sorry, couldn't find any country :(</h2>
                }
                </div>
                <Pagination
                countriesPerPage={this.state.countriesPerPage}
                totalCountries={this.props.countries.length}
                handlePage={this.handlePage}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        countries: state.countries,
        activities: state.activities
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