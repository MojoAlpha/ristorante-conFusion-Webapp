import * as ActionTypes from './actionTypes';

export const Feedbacks = (state = {
    errMess: null,
    feedback: {}
}, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK: 
            var feedback = action.payload;
            return {...state, feedback: state.feedback.concat(feedback)};   //this adds the comment object into the COMMENTS state
        default:
            return state;
    }
}