import initialState from './initialState';
import { FETCH_NEWS_DATA, RECEIVE_NEWS_DATA } from '../actions/actionTypes';

export default function newsData(state = initialState.newsData, action) {
    let newState;
    switch (action.type) {
        case FETCH_NEWS_DATA:
            // console.log('FETCH_NEWS_DATA Action')
            return action;
        case RECEIVE_NEWS_DATA:
            newState = action.newsData;
            // console.log('RECEIVE_NEWS_DATA Action')
            return newState;
        default:
            return state;
    }
}