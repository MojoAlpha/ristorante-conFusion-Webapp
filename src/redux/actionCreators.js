import * as ActionTypes from './actionTypes';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,   //action type specified
    payload: {  //data needed to be carried
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
})