import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

function configureStore(initialState = {}) {
    const reducer = combineReducers({
        data: persistReducer(
            {
                key: "data",
                storage,
                debug: true,
            },
            rootReducer
        ),
    });

    const store = createStore(persistReducer({
        key: "root",
        debug: true,
        storage,
        whitelist: ['auth'],
    }, reducer), initialState, applyMiddleware(thunk));

    console.log("initialState", store.getState());

    const persistor = persistStore(store, null, () => {
        // Fetch restoredState
        // console.log("restoredState", store.getState());
    });

    return { store, persistor };
}

export default configureStore;
