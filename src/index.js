import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { HashRouter } from 'react-router-dom';
// require('./serviceWorker');

ReactDOM.render((
    <HashRouter>
            <App />
    </HashRouter>
), document.getElementById("root"));