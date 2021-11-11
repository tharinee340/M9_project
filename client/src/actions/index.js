export const setsearch = (query) => {
    return {
        type: 'SET_SEARCH',
        payload: query
    }
}

export const deletesearch = () => {
    return {
        type: 'DELETE_SEARCH'
    }
}