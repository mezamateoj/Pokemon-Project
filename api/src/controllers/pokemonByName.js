const { Pokemon } = require('../db');
const { typeResponse } = require('./utils/response');
const { dbRelationship } = require('./utils/dbRelationship');
const axios = require('axios');


const getPokemonByName = async (req, res) => {
    const { name } = req.query;

    try {
        if (name) {
            // check if pokemon is in db
            let pokemon = await Pokemon.findOne({ where: { name }, include: typeResponse['include'] })

            // if not in db, check api
            if (!pokemon) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

                // if pokemon not found in api or db
                if (response.status !== 200) {
                    throw Error(`Pokemon named: ${name} not found`)
                }

                pokemon = response.data

                // create new pokemon object
                const newPokemon = {
                    apiId: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    health: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                }

                // create pokemon in db
                await dbRelationship(pokemon, newPokemon)

                // get pokemon from db
                const pokeName = await Pokemon.findOne({
                    where: { name: name },
                    include: typeResponse['include']
                });
                return res.status(200).json(pokeName)
            }
            return res.status(200).json(pokemon)
        }
    } catch (error) {
        return res.status(404).json({ error: error.message, message: error.response.statusText })
    }
}


module.exports = getPokemonByName;