const { Router } = require('express');
const { Country, Activity } = require('../db');
const axios = require('axios');

const countriesRouter = Router()

//  CREAR MIDDLEWARE PARA PEDIDO A API
//  CREAR MIDDLEWARE PARA CREACION DE PAISES

countriesRouter.get('/', async (req, res) => {
    const { name } = req.query;

    const controller = await Country.findByPk('BGR')

    if (!controller) {
        try {
            let response = await axios.get('https://restcountries.com/v3/all')

            for (let i = 0; i < response.data.length; i++) {
                let country = {
                    id: response.data[i].cca3,
                    name: response.data[i].name.common,
                    flag: response.data[i].flags[1],
                    region: response.data[i].region,
                    capital: response.data[i].capital ? response.data[i].capital[0] : 'None',
                    subregion: response.data[i].subregion,
                    area: response.data[i].area,
                    population: response.data[i].population,
                }
                await Country.create(country)
            }
        } catch (error) {
            return res.status(400).send('Algo salió mal')
        }
    }
    
    try {
    const countries = await Country.findAll({include: Activity});
        
        if (name) {
            let countryName = countries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))

            if (countryName) {
                return res.json(countryName)
            }
            return res.status(404).send('País no encontrado')
        }

        return res.json(countries);
    } catch (error) {
        return res.status(400).send(error)
    }
})

countriesRouter.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;

    if (idPais.length !== 3) return res.status(404).send('ID must have 3 letters')

    try {
        const country = await Country.findByPk(idPais);

        if (country) {
            let activities = await country.getActivities()

            activities.unshift(country)
    
            return res.json(activities)
        }
        return res.status(404).send('Country not found')
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = countriesRouter;
