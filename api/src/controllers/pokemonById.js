const { Pokemon } = require('../db');
const { typeResponse } = require('./utils/response');
const { dbRelationship } = require('./utils/dbRelationship');
const axios = require('axios');

const getPokemonByID = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            // check if pokemon is in db
            let pokemon = await Pokemon.findOne({ where: { id: id }, include: typeResponse['include'] })

            // if not in db, check api
            if (!pokemon) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                pokemon = response.data
                // create new pokemon object from api response
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

                // get pokemon from db, including types
                const pokeID = await Pokemon.findOne({
                    where: { apiId: id },
                    include: typeResponse['include']
                });

                return res.status(200).json(pokeID)
            }
            return res.status(200).json(pokemon)
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = getPokemonByID;