import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Dishes } from './dishes'
import { Comments } from './comments'
import { Promotions } from './promotions'
import { Leaders } from './leaders'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(   //combining all the reducers into one single store
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)   //enhancers being passed
    )

    return store;
}