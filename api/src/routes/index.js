const { Router } = require('express');
const { Country, Activity, conn } = require('../db');
const axios = require("axios");
const e = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', async (req, res) => {
    const { name } = req.query;

    const controller = await Country.findByPk('ARG')

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

router.get('/countries/:idPais', async (req, res) => {
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
})

router.post('/activities', async (req, res) => {
    const { name, difficulty, duration, season, countriesName } = req.body;
    let controller = await Activity.findAll({where: {name}});

    if (controller) {
        for(let i = 0; i < controller.length; i++) {
            if (difficulty == controller[i].difficulty && duration == controller[i].duration && season === controller[i].season) {
                return res.send('La actividad ya existe');
            }
        }
    }

    try {
        const activity = await Activity.create({ name, difficulty, duration, season });

        for (let i = 0; i < countriesName.length; i++) {
            let country = await Country.findOne({where: {name: countriesName[i]}})
            await activity.addCountry(country.id)
        }

        return res.status(201).send('Actividad creada con éxito')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/activities', async (req, res) => {
    
    try {
        const activities = await Activity.findAll();

        if (activities.length) return res.json(activities);
        return res.send('No hay actividades')
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;