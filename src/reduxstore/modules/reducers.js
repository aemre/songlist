import { combineReducers } from 'redux'
import appReducer from './app'
import networkReducer from './network'
import songReducer from './song'

/**
 * Combine Reducers
 */
const rootReducer = combineReducers({
    app: appReducer,
    network: networkReducer,
    song: songReducer
});

export default rootReducer;