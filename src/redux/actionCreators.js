import * as ActionTypes from './actionTypes';
import {baseUrl} from '../shared/baseUrl'

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