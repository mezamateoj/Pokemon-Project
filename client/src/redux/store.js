import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import typesReducer from './typesSlice';
import pokemonsReducer from './pokemonsSlice';

const rootReducer = combineReducers({
    // add reducers
    types: typesReducer,
    pokemons: pokemonsReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
