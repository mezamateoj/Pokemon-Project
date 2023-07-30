const { Router } = require('express');
const router = Router();
const getAllTypes = require('../controllers/typesControllers')
const { getPokemonByName, checkBody, checkID,
    getAllPokemons, getPokemonByID, createPokemon,
    sortByAttack, SortByName } = require('../controllers/pokemonControllers')

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
    .route('/attacks/:order')
    .get(sortByAttack)

router
    .route('/names/:order')
    .get(SortByName)


router
    .route('/types')
    .get(getAllTypes)



module.exports = router;
