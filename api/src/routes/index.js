const { Router } = require('express');
const router = Router();
const getAllTypes = require('../controllers/typesControllers')
const { getPokemonByName, checkBody, checkID, getAllPokemons, getPokemonByID, createPokemon } = require('../controllers/pokemonControllers')

router.param('id', checkID);

router
    .route('/pokemons/name?')
    .get(getPokemonByName)

router
    .route('/pokemons')
    .get(getAllPokemons)
    .post(checkBody, createPokemon)

router
    .route('/pokemons/:id')
    .get(getPokemonByID)


router
    .route('/types')
    .get(getAllTypes)



module.exports = router;
