import React, { Component } from "react";
import "./Login.less";
import { hot } from "react-hot-loader";
import { TextInput, Button } from 'grommet';
import { Route } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        }
    }

    render() {
        return (
            <div className="login-container">

                <div className="logo-container">
                    <h1>INVESTO</h1>
                </div>
                <TextInput
                    placeholder="USERNAME"
                    onChange={(event) => { this.setState({ username: event.target.value})}}
                />
                
                <TextInput
                    placeholder="PASSWORD"
                    type="password"
                    onChange={(event) => { this.setState({ username: event.target.value})}}
                />

                <Route render={({ history }) => (
                    <Button
                        label="LOGIN"
                        type='button'
                        onClick={() => { history.push('/') }}
                    />
                        
                )} />
            </div>
        );
    }
}

export default hot(module)(Login);