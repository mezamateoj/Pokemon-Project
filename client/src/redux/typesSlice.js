import axios from "axios";
const initialTypes = {
    types: [],
}

export default function typesReducer(state = initialTypes, action) {
    switch (action.type) {
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        default:
            return state;
    }
}

export function getTypes() {
    return async function getTypesThunk(dispatch) {
        const response = await axios.get(`/types`);
        dispatch({ type: 'GET_TYPES', payload: response.data })
    }
}