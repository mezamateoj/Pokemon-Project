const { Router } = require('express');
const router = Router();
const getAllTypes = require('../controllers/typesControllers')


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
