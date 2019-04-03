import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { HashRouter } from 'react-router-dom';

// Register service worker
// (function () {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('./service-worker.js', { scope: '/' })
//             .then(() => console.log('Service Worker registered successfully.'))
//             .catch(error => console.log('Service Worker registration failed:', error));
//     }
// })();

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById("root"));