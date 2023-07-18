const axios = require('axios');
const { Pokemon } = require('../db');

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


const getAllPokemons = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const offset = (page - 1) * limit;

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const pokemons = response.data.results

        // now for each pokemon in result fetch their details
        const details = await Promise.all(pokemons?.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            const detailedPokemon = response.data

            const pokemonData = {
                apiId: detailedPokemon.id,
                name: detailedPokemon.name,
                image: detailedPokemon.sprites.front_default,
                health: detailedPokemon.stats[0].base_stat,
                attack: detailedPokemon.stats[1].base_stat,
                defense: detailedPokemon.stats[2].base_stat,
                speed: detailedPokemon.stats[5].base_stat,
            }
            // Save it in your database
            await Pokemon.upsert(pokemonData);

            return pokemonData;
        }))
        return res.status(200).json(details)

    } catch (error) {
        return req.status(500).json({ error: error.message })
    }
}

const getPokemonByName = async (req, res) => {
    const { name } = req.query;
    console.log(name)

    try {
        if (name) {
            let pokemon = await Pokemon.findOne({ where: { name } })
            console.log('here')

            if (!pokemon) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                console.log(response.status)

                if (response.status !== 200) {
                    throw Error(`Pokemon ${name} not found`)
                }
                pokemon = response.data

                const newPokemon = {
                    apiId: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default,
                    health: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                }
                await Pokemon.create(newPokemon)

                return res.status(200).json(newPokemon)
            }
            return res.status(200).json(pokemon)
        }
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}


const getPokemonByID = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            let pokemon = await Pokemon.findOne({ where: { apiId: id } })

            if (!pokemon) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                pokemon = response.data

                const newPokemon = {
                    apiId: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default,
                    health: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                }
                await Pokemon.create(newPokemon)
                return res.status(200).json(newPokemon)
            }

            return res.status(200).json(pokemon)
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}


const createPokemon = async (req, res) => {



}


module.exports = {
    checkID,
    checkBody,
    getPokemonByName,
    getAllPokemons,
    getPokemonByID,
    createPokemon

}