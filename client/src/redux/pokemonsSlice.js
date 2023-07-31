

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
        case 'orderByOrigin':
            return {
                ...state,
                displayedPokemons: action.payload,
                loading: false
            }

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
