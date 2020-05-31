import * as ActionTypes from './actionTypes';

export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading:false, errMess: null, dishes: action.payload} 

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading:true, errMess: null, dishes: []}    //initial stage of loading or after refresh

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading:false, errMess: action.payload, dishes: []}    //spread operator of ES6: creating new object from old state

        default:
            return state;
    }
}