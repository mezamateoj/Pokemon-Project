const axios = require('axios');
const { Pokemon, Type } = require('../db');

const typeResponse = {
    include: [
        {
            model: Type,
            attributes: ['id', 'name'],  // Only include id and name for each type
            through: {
                attributes: [],  // Do not include any attributes from the join table
            },
        },
    ],
}

const dbRelationship = async (response, newPokemon) => {
    const pokemonTypes = response.types.map(type => type.type.name);

    const typeInstances = await Type.findAll({ where: { name: pokemonTypes, } });

    let pokemon = await Pokemon.create(newPokemon, { include: Type });
    await pokemon.setTypes(typeInstances);

    // This method reloads the data for the Pokemon instance from the database, including its associated Types.
    // final JSON response will include the Types for all Pokemons, whether or not they were already in the database.
    await pokemon.reload({
        include: [
            {
                model: Type,
                attributes: ['id', 'name'],  // Only include id and name for each type
                through: {
                    attributes: [],  // Do not include any attributes from the join table
                },
            },
        ],
    });

    return pokemon
}

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



const getPokemonByName = async (req, res) => {
    const { name } = req.query;

    try {
        if (name) {
            let pokemon = await Pokemon.findOne({ where: { name }, include: typeResponse['include'] })

            if (!pokemon) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

                // if pokemon not found in api or db
                if (response.status !== 200) {
                    throw Error(`Pokemon named: ${name} not found`)
                }
                x
                pokemon = response.data

                const newPokemon = {
                    apiId: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    health: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                }

                await dbRelationship(pokemon, newPokemon)

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


const getPokemonByID = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            let pokemon = await Pokemon.findOne({ where: { id: id }, include: typeResponse['include'] })


            if (!pokemon) {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                pokemon = response.data

                const newPokemon = {
                    apiId: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other['official-artwork'].front_default,
                    health: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                }
                await dbRelationship(pokemon, newPokemon)

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


const createPokemon = async (req, res) => {
    const { name, image, health, attack, defense, speed, types } = req.body;
    console.log(req.body)

    try {
        let pokemon = await Pokemon.findOne({ where: { name: name }, include: typeResponse['include'] })

        if (pokemon) {
            throw Error(`Pokemon named:  ${name} already created`)
        }

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

            const pokemonTypes = newPokemon.types.map(t => t)
            const typeInstances = await Type.findAll({ where: { name: pokemonTypes, } });

            let pokemon = await Pokemon.create(newPokemon, { include: Type });
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

const sortByAttack = async (req, res) => {
    const { order } = req.params
    const filterOrder = order === 'desc' ? 'DESC' : 'ASC';
    try {
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
        const pokemons = await Pokemon.findAll({
            order: [['name', filterOrder]],
            include: typeResponse['include']
        });
        return res.status(200).json(pokemons)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}


module.exports = {
    checkID,
    checkBody,
    getPokemonByName,
    getAllPokemons,
    getPokemonByID,
    createPokemon,
    sortByAttack,
    SortByName

}