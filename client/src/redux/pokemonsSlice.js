import axios from "axios";
const initialPokemonState = {
    pokemons: [],
    displayedPokemons: [],
    createdPokemons: [],
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
        case 'CREATE_POKEMON':
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                createdPokemons: [...state.createdPokemons, action.payload]
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
        case 'goToPage':
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
            // Assuming action.payload is an array of new pokemons
            const newPokemon = action.payload

            // Create a set of existing names for easy lookup
            const existingNames = new Set(state.pokemons.map(pokemon => pokemon.name));

            // Only add pokemons that don't already exist in the state
            const newPokemonToAdd = newPokemon.filter(pokemon => !existingNames.has(pokemon.name));


            return {
                ...state,
                pokemons: [...state.pokemons, ...newPokemonToAdd],
                displayedPokemons: newPokemon,
                loading: false
            }

        case 'filterByType':
            const filteredByType = state.pokemons.flat().filter(pokemon => pokemon.Types ? pokemon.Types.map(type => type.name).includes(action.payload) : 'No type found')
            return {
                ...state,
                displayedPokemons: filteredByType,
                loading: false
            }
        case 'filterByOrigin':

            // console.log(state.pokemons.flat())
            // console.log(state.pokemons.flat().filter(p => p.apiId === null))
            if (action.payload === 'Created') {
                return {
                    ...state,
                    displayedPokemons: state.pokemons.flat().filter(p => p.apiId === null),
                    loading: false
                }
            }
            if (action.payload === 'API') {
                return {
                    ...state,
                    displayedPokemons: state.pokemons.flat().filter(p => p.apiId !== null).slice(-12),
                    loading: false
                }
            }
            break;
        case 'resetFilters':
            const resetFilters = state.pokemons.flat().filter(p => p.apiId !== null)

            return {
                ...state,
                displayedPokemons: resetFilters.slice(-12),
            }

        case 'filterByAttack':
            return {
                ...state,
                displayedPokemons: action.payload,
                loading: false
            }

        case 'orderByName':
            return {
                ...state,
                displayedPokemons: action.payload,
                loading: false
            }


        case 'switchLoading':
            return {
                ...state,
                loading: !state.loading
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

export function createPokemon(pokemon) {
    return async function createPokemonThunk(dispatch) {
        dispatch({ type: 'loading' })

        const response = await axios.post('http://localhost:3001/pokemons', pokemon);

        dispatch({ type: 'CREATE_POKEMON', payload: response.data })
    }
}

export function filterByAttack(order) {
    return async function filterByAttackThunk(dispatch) {
        dispatch({ type: 'loading' })

        const response = await axios.get(`http://localhost:3001/attacks/${order}`);

        dispatch({ type: 'filterByAttack', payload: response.data })
    }
}


export function orderByName(order) {
    return async function filterByNameThunk(dispatch) {
        dispatch({ type: 'loading' })

        const response = await axios.get(`http://localhost:3001/names/${order}`);

        dispatch({ type: 'orderByName', payload: response.data })
    }
}

export function filterByType(type) {
    return {
        type: 'filterByType',
        payload: type
    }
}

export function filterByOrigin(origin) {
    return {
        type: 'filterByOrigin',
        payload: origin
    }
}

// export function filterByAttack(attack) {
//     return {
//         type: 'filterByAttack',
//         payload: attack
//     }
// }

export function filterNameAscDsc(name) {
    return {
        type: 'filterNameAscDsc',
        payload: name
    }
}


export function resetFilters() {
    return {
        type: 'resetFilters'
    }
}

export function nextPage() {
    return (dispatch, getState) => {
        const currentPage = getState().pokemons.currentPage
        dispatch({
            type: 'nextPage',
            payload: currentPage + 1
        })
    }
}

export function prevPage() {
    return (dispatch, getState) => {
        const currentPage = getState().pokemons.currentPage
        dispatch({
            type: 'prevPage',
            payload: currentPage - 1
        })
    }
}


export function goToPage(page) {
    return {
        type: 'goToPage',
        payload: page
    }
}