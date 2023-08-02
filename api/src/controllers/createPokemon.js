const { Pokemon, Type } = require('../db');
const { typeResponse } = require('./utils/response');


// middleware to check if all required fields are present in the request body
const checkBody = (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.image || !body.attack || !body.speed || !body.defense || !body.health) {
        return res.status(400).json({
            status: 'fail',
            message: 'missing data to create a Pokemon'
        })
    }
    next()
}



const createPokemon = async (req, res) => {
    const { name, image, health, attack, defense, speed, types } = req.body;
    console.log(req.body)

    try {
        // check if pokemon is in db
        let pokemon = await Pokemon.findOne({ where: { name: name }, include: typeResponse['include'] })

        if (pokemon) {
            throw Error(`Pokemon named:  ${name} already created`)
        }

        // if not in db, create new pokemon
        if (!pokemon) {
            const newPokemon = {
                name: name,
                image: image,
                health: health,
                attack: attack,
                defense: defense,
                speed: speed,
                types: types
            }

            // since types is an array, we need to map over it to get the name of each type
            const pokemonTypes = newPokemon.types.map(t => t)
            // find all types in db that match the types in the request body
            const typeInstances = await Type.findAll({ where: { name: pokemonTypes, } });

            // create pokemon in db
            let pokemon = await Pokemon.create(newPokemon, { include: Type });
            // set the types for the pokemon
            await pokemon.setTypes(typeInstances);

            const pokeCreated = await Pokemon.findOne({
                where: { name: name },
                include: typeResponse['include']
            });

            return res.status(200).json(pokeCreated)
        }

    } catch (error) {
        if (error.response) {
            return res.status(400).json({ error: error.response.data.error })
        }
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { checkBody, createPokemon };
