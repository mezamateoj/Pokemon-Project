const { Pokemon, Type } = require('../../db');


const dbRelationship = async (response, newPokemon) => {
    // map over the types array and return an array with only the types names
    const pokemonTypes = response.types.map(type => type.type.name);

    // Find the types in the database
    const typeInstances = await Type.findAll({ where: { name: pokemonTypes, } });

    // Create the Pokemon in the database, and associate it with the types we created in the last step
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

module.exports = { dbRelationship };