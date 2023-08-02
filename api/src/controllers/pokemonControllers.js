const axios = require('axios');
const { Pokemon } = require('../db');
const { typeResponse } = require('./utils/response')
const { dbRelationship } = require('./utils/dbRelationship')

// dont need it anymore
const checkID = (req, res, next, val) => {
    // hardcoded count:1281 pokemons in api
    if (req.params.id * 1 > 1281) {
        return res.status(404).json({
            status: 'fail',
            message: `Pokemon id: ${val} not found`
        })
    }
    next()
}


const getAllPokemons = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;

    try {


        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const pokemons = await response.data.results


        // now for each pokemon in result fetch their details
        const details = await Promise.all(pokemons?.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            const detailedPokemon = response.data

            const pokemonData = {
                apiId: detailedPokemon.id,
                name: detailedPokemon.name,
                image: detailedPokemon.sprites.other['official-artwork'].front_default,
                health: detailedPokemon.stats[0].base_stat,
                attack: detailedPokemon.stats[1].base_stat,
                defense: detailedPokemon.stats[2].base_stat,
                speed: detailedPokemon.stats[5].base_stat,
            }

            let existingPokemon = await Pokemon.findOne({ where: { apiId: pokemonData.apiId }, include: typeResponse['include'] });

            if (!existingPokemon) {
                existingPokemon = await dbRelationship(detailedPokemon, pokemonData);
            }
            return existingPokemon
        }))

        const all = details
        const count = await Pokemon.count();
        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
            count: count,
            totalPages: totalPages,
            currentPage: page,
            pokemons: all
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}



module.exports = {
    checkID,
    getAllPokemons,
}