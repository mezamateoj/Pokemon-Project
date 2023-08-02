const getAllTypes = require('../controllers/typesControllers')
const getPokemonByName = require('../controllers/pokemonByName')
const getPokemonByID = require('../controllers/pokemonById')
const createImage = require('../controllers/createImageAI')

const { Router } = require('express');
const router = Router();

const { checkBody, createPokemon } = require('../controllers/createPokemon')
const { sortByAttack, SortByName, filterByOrigin } = require('../controllers/pokemonFilters')
const { checkID, getAllPokemons, } = require('../controllers/pokemonControllers')

// param middleware, only runs if there is a param called id
router.param('id', checkID);

router
    .route('/pokemons/name?')
    .get(getPokemonByName)

router
    .route('/pokemons')
    .get(getAllPokemons)
    // run middleware to check body before creating pokemon
    .post(checkBody, createPokemon)

router
    .route('/pokemons/:id')
    .get(getPokemonByID)

router
    .route('/attacks/:order')
    .get(sortByAttack)

router
    .route('/names/:order')
    .get(SortByName)

router
    .route('/origin/:origin')
    .get(filterByOrigin)

router
    .route('/types')
    .get(getAllTypes)

// route to create images using Dall-E
router
    .route('/images')
    .post(createImage)


module.exports = router;
