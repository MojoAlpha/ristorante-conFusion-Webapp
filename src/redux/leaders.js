import {LEADERS} from '../shared/leaders'

export const Leaders = (state = LEADERS, action) => {   //reducer function contains state and action as parameter
    switch(action.type) {
        default:
            return state;
    }
}