import React, { Component } from "react";
import "./App.less";
import { hot } from "react-hot-loader";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import { Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';

class App extends Component {
    render() {
        return (
            <Grommet plain>
                <Route
                    render={({ location }) => {
                        const { pathname } = location;
                        return (
                            <Route
                                location={location}
                                render={() => (
                                <div className="App">
                                    <Switch>
                                        <Route path='/login' component={Login} />
                                        <Route exact path='/' component={Home} />
                                    </Switch>
                                </div>
                                )}
                            />
                        );
                    }}
                />
            </Grommet>
        );
    }
}

export default hot(module)(App);