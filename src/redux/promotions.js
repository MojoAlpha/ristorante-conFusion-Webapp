import {PROMOTIONS} from '../shared/promotions'

export const Promotions = (state = PROMOTIONS, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        default:
            return state;
    }
}