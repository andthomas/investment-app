import initialState from './initialState';
import { FETCH_SHARE_DATA, RECEIVE_SHARE_DATA } from '../actions/actionTypes';

export default function shareData(state = initialState.shareData, action) {
    let newState;
    switch (action.type) {
        case FETCH_SHARE_DATA:
            return action;
        case RECEIVE_SHARE_DATA:
            newState = action.shareData;
            return newState;
        default:
            return state;
    }
}