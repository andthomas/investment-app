import React, { Component } from "react";
import "./App.less";
import { hot } from "react-hot-loader";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grommet } from 'grommet';
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

class App extends Component {
    render() {
        return (
            <Grommet plain>
                <Route
                    render={({ location }) => {
                        const { pathname } = location;
                        return (
                        <TransitionGroup>
                            <CSSTransition
                                key={pathname}
                                classNames="page"
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
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
                            </CSSTransition>
                        </TransitionGroup>
                        );
                    }}
                />
            </Grommet>
        );
    }
}

export default hot(module)(App);