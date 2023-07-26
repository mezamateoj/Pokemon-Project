import axios from "axios";
const initialPokemonState = {
    pokemons: [],
    displayedPokemons: [],
    displayedPokemonsByName: [],
    loading: false,
    currentPage: 1
}

export default function pokemonReducer(state = initialPokemonState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            // Create a set of existing apiIds for easy lookup
            const existingIds = new Set(state.pokemons.map(pokemon => pokemon.id));

            // Only add pokemons that don't already exist in the state
            const newPokemons = action.payload.pokemons.filter(pokemon => !existingIds.has(pokemon.id));

            const updatedPokemons = [...state.pokemons, ...action.payload.pokemons];
            return {
                ...state,
                pokemons: [...state.pokemons, ...newPokemons],
                displayedPokemons: updatedPokemons.slice(-12),
                loading: false,
                currentPage: action.payload.currentPage
            }
        case 'nextPage':
            return {
                ...state,
                currentPage: action.payload

            }

        case 'prevPage':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'loading':
            return {
                ...state,
                loading: true
            }
        case 'filterByName':
            const filteredByName = state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                displayedPokemonsByName: filteredByName
            }
        default:
            return state;
    }
}

export function getPokemons(page) {
    return async function getPokemonsThunk(dispatch) {

        dispatch({ type: 'loading' })

        const response = await axios.get(`http://localhost:3001/pokemons?page=${page}&limit=12`);
        const currentPage = response.data.currentPage
        dispatch({ type: 'GET_POKEMONS', payload: { pokemons: response.data.pokemons, currentPage: currentPage } })
    }
}

export function filterByName(name) {
    return async function filterByNameThunk(dispatch) {
        dispatch({ type: 'loading' })


        const response = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`);
        console.log(response.data)
        dispatch({ type: 'filterByName', payload: response.data.name })
    }
}

export function nextPage(currentPage) {
    return {
        type: 'nextPage',
        payload: currentPage + 1
    }

}

export function prevPage(currentPage) {
    return {
        type: 'prevPage',
        payload: currentPage - 1
    }
}
