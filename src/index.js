import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { HashRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

const {store, persistor} = configureStore();

// require('./serviceWorker');

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                    <App />
            </HashRouter>
        </PersistGate>
    </Provider>
), document.getElementById("root"));