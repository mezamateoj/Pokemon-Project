const { Pokemon } = require('../db');
const { typeResponse } = require('./utils/response');
const { Op } = require("sequelize");


const sortByAttack = async (req, res) => {
    const { order } = req.params
    // if order is desc, then filterOrder is DESC, else filterOrder is ASC
    const filterOrder = order === 'desc' ? 'DESC' : 'ASC';
    try {
        // find all pokemons, order by attack, include types
        const pokemons = await Pokemon.findAll({
            order: [['attack', filterOrder]],
            include: typeResponse['include']
        });
        return res.status(200).json(pokemons)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}


const SortByName = async (req, res) => {
    const { order } = req.params
    const filterOrder = order === 'desc' ? 'DESC' : 'ASC';
    try {
        // find all pokemons, order by name, include types
        const pokemons = await Pokemon.findAll({
            order: [['name', filterOrder]],
            include: typeResponse['include']
        });
        return res.status(200).json(pokemons)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}



const filterByOrigin = async (req, res) => {
    const { origin } = req.params
    const filterOrigin = origin === 'API' ? true : false;

    try {
        // find all pokemons, where apiId is not null, include types: this is for pokemons from api
        // find all pokemons, where apiId is null, include types: this is for pokemons created on the client
        const pokemons = await Pokemon.findAll({
            where: filterOrigin ? { apiId: { [Op.not]: null } } : { apiId: null },
            include: typeResponse['include']
        });
        if (pokemons.length === 0) {
            throw Error(`No pokemons found with origin: ${origin}`)
        }
        return res.status(200).json(pokemons)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}

module.exports = { sortByAttack, SortByName, filterByOrigin };