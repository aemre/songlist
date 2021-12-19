import {combineReducers} from 'redux'
import appReducer from './app'
import networkReducer from './network'

/**
 * Combine Reducers
 */
const rootReducer = combineReducers({
    app:appReducer,
    network:networkReducer
});

export default rootReducer;