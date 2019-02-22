import React, { Component } from "react";
import "./Home.less";
import { hot } from "react-hot-loader";
import { DropButton, Box, Button } from "grommet";
import { Route } from 'react-router-dom';
import Portfolio from "../components/Portfolio.js";
import Invest from "../components/Invest.js";
import News from "../components/News.js";

class Home extends Component {
    render() {
        return (
            <div>
                <div className="top-navbar">
                    <Route render={({ history }) => (
                        <Button
                            className="logout-button"
                            icon={<i className=" fa fa-angle-left fa-2x"></i>}
                            type='button'
                            onClick={() => { history.push('/login') }}
                        />
                    )} />

                    {/* <DropButton
                        className="menu"
                        icon={<i className=" fa fa-cog fa-2x"></i>}
                        dropContent={
                            <Route render={({ history }) => (
                                <Box 
                                    className="logout-button"
                                    pad="large" 
                                    onClick={() => { history.push('/') }}
                                    background="light-2">
                                    Logout
                                </Box>
                            )} />
                        }
                    /> */}
                    
                </div>

                <Portfolio />
                {/* <Invest />
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