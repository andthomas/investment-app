import React, { Component } from "react";
import "./App.less";
import { hot } from "react-hot-loader";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path='/login' component={Login} />
                <Route path='/home' component={Home} />
            </div>
        );
    }
}

export default hot(module)(App);