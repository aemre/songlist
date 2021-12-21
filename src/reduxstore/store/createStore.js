import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from '../modules/reducers'
import rootSagas from '../sagas'

/**
 * Create Redux Store
 */
export default function configureStore() {

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware, logger)));
    store.dispatch({ type: 'APP/INIT' })
    sagaMiddleware.run(rootSagas);

    return store;
}

