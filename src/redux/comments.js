import {COMMENTS} from '../shared/comments'
import * as ActionTypes from './actionTypes';

export const Comments = (state = COMMENTS, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        case ActionTypes.ADD_COMMENT: 
            var comment = action.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            return state.concat(comment);   //this adds the comment object into the COMMENTS state
        default:
            return state;
    }
}