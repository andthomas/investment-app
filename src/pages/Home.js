import React, { Component } from "react";
import "./Home.less";
import { hot } from "react-hot-loader";

class Home extends Component {
    render() {
        return (
            <div>
                <h1> Home </h1>
            </div>
        );
    }
}

export default hot(module)(Home);