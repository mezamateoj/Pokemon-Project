export function filterByType(type) {
    return {
        type: 'filterByType',
        payload: type
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