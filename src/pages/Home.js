import React, { Component } from "react";
import "./Home.less";
import { hot } from "react-hot-loader";
import { DropButton, Box, Button } from "grommet";
import { Route } from 'react-router-dom';
import Portfolio from "../components/Portfolio.js";
import Invest from "../components/Invest.js";
import News from "../components/News.js";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {currentView: "portfolio"}

        // this.changeView = this.changeView.bind(this);
    }
    
    changeView(view) {
        this.setState({ currentView: view });
    }

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
                </div>

                {this.state.currentView === "portfolio" ? <Portfolio /> : null}
                {this.state.currentView === "invest" ? <Invest /> : null}
                {this.state.currentView === "news" ? <News /> : null}

                <div className="bottom-navbar">
                    <div
                        onClick={ () => this.changeView('invest') } 
                        className={`nav-item`}>
                        <i className="fa fa-bolt fa-2x"></i>
                    </div>
                    <div
                        onClick={ () => this.changeView('portfolio') }
                        className="nav-item">
                        <i className="fa fa-user fa-2x"></i>
                    </div>
                    <div
                        onClick={ () => this.changeView('news') }
                        className="nav-item">
                        <i className="fa fa-lock fa-2x"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(Home);