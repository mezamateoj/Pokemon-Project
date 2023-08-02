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

export function orderByName(name) {
    return {
        type: 'orderByName',
        payload: name
    }
}

export function filterByAttack(attack) {
    return {
        type: 'orderByName',
        payload: attack
    }
}

export function orderByOrigin(origin) {
    return {
        type: 'orderByOrigin',
        payload: origin
    }
}

export function nextPage() {
    return (dispatch, getState) => {
        const currentPage = getState().displayedPokemons.currentPage
        dispatch({
            type: 'nextPage',
            payload: currentPage + 1
        })
    }
}

export function prevPage() {
    return (dispatch, getState) => {
        const currentPage = getState().displayedPokemons.currentPage
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