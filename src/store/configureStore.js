import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

function configureStore(initialState = {}) {
    const reducer = combineReducers({
        // auth: () => ({ mock: true }),
        data: persistReducer(
            {
                key: "data", // key for localStorage key, will be: "persist:data"
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
        // whitelist: ['auth'],
    }, reducer), initialState, applyMiddleware(thunk));

    console.log("initialState", store.getState());

    const persistor = persistStore(store, null, () => {
        // if you want to get restoredState
        console.log("restoredState", store.getState());
    });

    return { store, persistor };
}

export default configureStore;
