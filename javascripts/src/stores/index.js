import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import moduleReducers from '../reducers/index'

export default function configureStore() {

    const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    let store = createStore(
        moduleReducers,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                createLogger()
            )
        )
    );
    return store
}
