import * as ActionTypes from './actionTypes';

export const Comments = (state = {
    errMess: null,
    comments: []
}, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload} 

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload, comments: []}

        case ActionTypes.ADD_COMMENT: 
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};   //this adds the comment object into the COMMENTS state
        default:
            return state;
    }
}