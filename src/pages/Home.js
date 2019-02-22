import React, { Component } from "react";
import "./Home.less";
import { hot } from "react-hot-loader";
import { Tabs, Tab, Box } from "grommet";

class Home extends Component {
    render() {
        return (
            <div>
                <div className="top-navbar">
                    <i className="fa fa-cog fa-2x"></i>
                </div>

                {/* <Profile />
                <Invest />
                <News /> */}

                <div className="bottom-navbar">
                    <div className="nav-item">
                        <i className="fa fa-bolt fa-2x"></i>
                    </div>
                    <div className="nav-item">
                        <i className="fa fa-user fa-2x"></i>
                    </div>
                    <div className="nav-item">
                        <i className="fa fa-lock fa-2x"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(Home);