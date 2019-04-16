import { combineReducers } from 'redux';
import shareData from './shareReducer';
import newsData from './newsReducer';

const rootReducer = combineReducers({
    shareData,
    newsData
});

export default rootReducer;