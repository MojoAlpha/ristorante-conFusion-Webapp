import {DISHES} from '../shared/dishes'

export const Dishes = (state = DISHES, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        default:
            return state;
    }
}