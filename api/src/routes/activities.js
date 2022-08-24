const { Router } = require('express');
const { Country, Activity } = require('../db');

const router = Router();


router.post('/', async (req, res) => {
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
});

router.get('/', async (req, res) => {
    
    try {
        const activities = await Activity.findAll();

        if (activities.length) return res.json(activities);
        return res.send('No hay actividades')
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;