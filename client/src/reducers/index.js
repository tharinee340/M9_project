import searchReducers from './search'

import {combineReducers} from 'redux'

const allReducers = combineReducers({
    search: searchReducers,
})

export default allReducers