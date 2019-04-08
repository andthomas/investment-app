import initialState from './initialState';
import { FETCH_SHARE_DATA, RECEIVE_SHARE_DATA } from '../actions/actionTypes';

export default function shareData(state = initialState.shareData, action) {
    let newState;
    switch (action.type) {
        case FETCH_SHARE_DATA:
            console.log('FETCH_SHARE_DATA Action')
            return action;
        case RECEIVE_SHARE_DATA:
            newState = action.shareData;
            console.log('RECEIVE_SHARE_DATA Action')
            return newState;
        default:
            return state;
    }
}