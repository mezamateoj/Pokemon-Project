const { Router } = require('express');
const router = Router();
const getAllTypes = require('../controllers/typesControllers')
const { getPokemonByName, checkBody, checkID, getAllPokemons, getPokemonByID, createPokemon } = require('../controllers/pokemonControllers')

router.param('id', checkID);

router
    .route('/')
    .get(getAllPokemons)
    .post(checkBody, createPokemon)

router
    .route('/:id')
    .get(getPokemonByID)

router
    .route('/:name')
    .get(getPokemonByName)

router
    .route('/type')
    .get(getAllTypes)



module.exports = router;
