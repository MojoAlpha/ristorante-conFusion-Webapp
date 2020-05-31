import * as ActionTypes from './actionTypes';
import {DISHES} from '../shared/dishes'

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,   //action type specified
    payload: {  //data needed to be carried
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
})

export const fetchDishes = () => (dispatch) => {   //thunk returning a dispatch function
    dispatch(dishesLoading(true))
    
    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000)
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
})

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})