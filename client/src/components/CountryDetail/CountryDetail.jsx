import React, { Component } from "react";
import {connect} from "react-redux";
import { getCountryDetail } from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import '../CountryDetail/CountryDetail.css'


class CountryDetail extends Component {

    componentDidMount() {
        this.props.getCountryDetail(this.props.match.params.id)
    }

    render() {
        const country = this.props.countryDetail[0]
        if (this.props.countryDetail.length > 1) {
            var activity = this.props.countryDetail.slice(1)
        }

        return (
            <div className="general">
                <NavBar />
                <div className="completo">
                    <h1>{country?.name}</h1>
                    <hr/>
                    <div className="country-detail">
                        <img src={country?.flag} alt='Flag not found' />
                        <div>
                            <p>Region: {country?.region}</p>
                            <p>Capital: {country?.capital}</p>
                            <p>Subregion: {country?.subregion}</p>
                        </div>
                        <div>
                            <p>Country code: {country?.id}</p>
                            <p>Area: {country?.area}</p>
                            <p>Population: {country?.population}</p>
                        </div>
                    </div>
                    <div className="activities">
                        <hr />
                            {   
                            activity ?
                            activity?.map(a => {
                                return (
                                    <div key={a.id}>
                                        <span>Activity name: {a.name} - </span>
                                        <span>Difficulty: {a.difficulty} - </span>
                                        <span>Duration: {a.duration} - </span>
                                        <span>Season: {a.season}</span>
                                    </div>
                            )
                        })
                        : <h3>No activities yet</h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        countryDetail: state.countryDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCountryDetail: (id) => dispatch(getCountryDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail)