import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'


const middleware = applyMiddleware(thunk)

export default (data = {}) => {
  const rootReducer = combineReducers({
        main: (state = {}) => state
  })

  return createStore(rootReducer, data, middleware)
}