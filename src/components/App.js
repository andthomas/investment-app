import React, { Component } from "react";
import "./App.less";
import { hot } from "react-hot-loader";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import { BrowserRouter, Route } from 'react-router-dom';
import { Grommet } from 'grommet';

class App extends Component {
    render() {
        return (
            <Grommet plain>
                <div className="App">
                    <Route path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                </div>
            </Grommet>
        );
    }
}

export default hot(module)(App);