const searchreducer = (state = null,action) => {
    switch(action.type){
        case 'SET_SEARCH':
            state = action.payload
            return state
        case 'DELETE_SEARCH':
            return null
        default:
            return state
    }
}

export default searchreducer