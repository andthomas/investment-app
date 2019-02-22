import React, { Component } from "react";
import "./Login.less";
import { hot } from "react-hot-loader";
import { TextInput, Button, Anchor } from 'grommet';
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
                    <i className="fa fa-paper-plane fa-4x"></i>
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
                
                <Anchor href="#" primary label="Forgot something?" />
            </div>
        );
    }
}

export default hot(module)(Login);