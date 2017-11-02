import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'


const middleware = applyMiddleware(thunk)

export default (data = {}) => {
    return createStore(reducers, data, middleware)
}