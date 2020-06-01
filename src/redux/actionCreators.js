import * as ActionTypes from './actionTypes';
import {baseUrl} from '../shared/baseUrl'

//ADDING COMMENT INTO THE JSON-WEB-SERVER
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,   //action type specified
    payload: { comment: comment }
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {   //redux thunk to add the comment to the server
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString()

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if(response.ok)     //ok property tells about if the server gave an ok response
            return response   //this response is delivered to the next promise
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)   //error object generation
            error.response = response
            throw error
        }
    }, 
    error => {      //in case we don't get response back from the server
        var errMess = new Error(error.message)
        throw errMess
    })
    .then( response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post Comments ', error.message)
        alert("Your Comment couldn't be posted \n Error : " + error.message)})
}

//ADDING FEEDBACK INTO THE JSON-WEB-SERVER
export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,   //action type specified
    payload: { feedback: feedback }
})


export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {   //redux thunk to add the comment to the server
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    newFeedback.date = new Date().toISOString()

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if(response.ok)     //ok property tells about if the server gave an ok response
            return response   //this response is delivered to the next promise
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)   //error object generation
            error.response = response
            throw error
        }
    }, 
    error => {      //in case we don't get response back from the server
        var errMess = new Error(error.message)
        throw errMess
    })
    .then( response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error => {console.log('Post Feedback ', error.message)
        alert("Your Feedback couldn't be posted \n Error : " + error.message)})
}

//DISHES STORE ACCESS
export const fetchDishes = () => (dispatch) => {   //thunk returning a dispatch function
    dispatch(dishesLoading(true))
    
    return fetch(baseUrl + 'dishes')
        .then( response => {
            if(response.ok)     //ok property tells about if the server gave an ok response
                return response   //this response is delivered to the next promise
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)   //error object generation
                error.response = response
                throw error
            }
        }, 
        error => {      //in case we don't get response back from the server
            var errMess = new Error(error.message)
            throw errMess
        })
        .then( response => response.json())
        .then( dishes => dispatch(addDishes(dishes)))
        .catch( error => dispatch(dishesFailed(error.message)))
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

export const fetchComments = () => (dispatch) => {   //thunk returning a dispatch function    
    return fetch(baseUrl + 'comments') 
    .then( response => {
        if(response.ok)     //ok property tells about if the server gave an ok response
            return response   //this response is delivered to the next promise
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)   //error object generation
            error.response = response
            throw error
        }
    }, 
    error => {      //in case we don't get response back from the server
        var errMess = new Error(error.message)
        throw errMess
    })              //fetching the data from the server
        .then( response => response.json())
        .then( comments => dispatch(addComments(comments)))
        .catch( error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchPromos = () => (dispatch) => {   //thunk returning a dispatch function
    dispatch(promosLoading(true))
    
    return fetch(baseUrl + 'promotions')
    .then( response => {
        if(response.ok)     //ok property tells about if the server gave an ok response
            return response   //this response is delivered to the next promise
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)   //error object generation
            error.response = response
            throw error
        }
    }, 
    error => {      //in case we don't get response back from the server
        var errMess = new Error(error.message)
        throw errMess
    })
        .then( response => response.json())
        .then( promos => dispatch(addPromos(promos)))
        .catch( error => dispatch(promosFailed(error.message)))

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
})

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const fetchLeaders = () => (dispatch) => {   //thunk returning a dispatch function
    dispatch(leadersLoading(true))
    
    return fetch(baseUrl + 'leaders')
    .then( response => {
        if(response.ok)     //ok property tells about if the server gave an ok response
            return response   //this response is delivered to the next promise
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)   //error object generation
            error.response = response
            throw error
        }
    }, 
    error => {      //in case we don't get response back from the server
        var errMess = new Error(error.message)
        throw errMess
    })
        .then( response => response.json())
        .then( promos => dispatch(addLeaders(promos)))
        .catch( error => dispatch(leadersFailed(error.message)))

}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
})

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})