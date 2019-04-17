import { combineReducers } from 'redux';
import shareData from './shareReducer';
import newsData from './newsReducer';
import shareList from './shareListReducer';

const rootReducer = combineReducers({
    shareData,
    newsData,
    shareList
});

export default rootReducer;