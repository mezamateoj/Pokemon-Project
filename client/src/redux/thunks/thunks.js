import axios from 'axios';

export function filterByOrigin(origin) {
    return async function filterByOriginThunk(dispatch) {
        try {
            dispatch({ type: 'loading' })

            const response = await axios.get(`http://localhost:3001/origin/${origin}`);
            console.log(response.data)

            dispatch({ type: 'orderByOrigin', payload: response.data })

        } catch (error) {
            dispatch({ type: 'switchLoading' })
            throw (error);

        }
    }
}

export function orderByName(order) {
    return async function filterByNameThunk(dispatch) {
        dispatch({ type: 'loading' })

        const response = await axios.get(`http://localhost:3001/names/${order}`);

        dispatch({ type: 'orderByName', payload: response.data })
    }
}

export function filterByAttack(order) {
    return async function filterByAttackThunk(dispatch) {
        dispatch({ type: 'loading' })

        const response = await axios.get(`http://localhost:3001/attacks/${order}`);

        dispatch({ type: 'filterByAttack', payload: response.data })
    }
}

export function createPokemon(pokemon) {
    return async function createPokemonThunk(dispatch) {
        dispatch({ type: 'loading' })

        const response = await axios.post('http://localhost:3001/pokemons', pokemon);

        dispatch({ type: 'CREATE_POKEMON', payload: response.data })
    }
}

export function filterByName(name) {
    return async function filterByNameThunk(dispatch) {
        dispatch({ type: 'loading' })

        try {
            const response = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);
            dispatch({ type: 'filterByName', payload: [response.data] })
            console.log(response.data)

        } catch (error) {
            dispatch({ type: 'switchLoading' })
            throw (error);
        }

    }
}

export function getAllPokemons(page) {
    return async function getPokemonsThunk(dispatch) {

        dispatch({ type: 'loading' })

        const response = await axios.get(`http://localhost:3001/pokemons?page=${page}&limit=12`);
        const currentPage = response.data.currentPage
        dispatch({ type: 'GET_POKEMONS', payload: { pokemons: response.data.pokemons, currentPage: currentPage } })
    }
}