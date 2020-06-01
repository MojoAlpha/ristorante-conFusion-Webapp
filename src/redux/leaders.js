import * as ActionTypes from './actionTypes';

export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    leaders: []
}, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
            case ActionTypes.ADD_LEADERS:
                return {...state, isLoading:false, errMess: null, leaders: action.payload} 
    
            case ActionTypes.LEADERS_LOADING:
                return {...state, isLoading:true, errMess: null, leaders: []}    //initial stage of loading or after refresh
    
            case ActionTypes.LEADERS_FAILED:
                return {...state, isLoading:false, errMess: action.payload, leaders: []} 

        default:
            return state;
    }
}