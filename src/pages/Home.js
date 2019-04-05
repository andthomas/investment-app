import React, { Component } from "react";
import "./Home.less";
import { hot } from "react-hot-loader";
import { DropButton, Box, Button } from "grommet";
import { Route } from 'react-router-dom';
import Portfolio from "../components/Portfolio.js";
import Invest from "../components/Invest.js";
import News from "../components/News.js";
import PropTypes from 'prop-types';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {currentView: "portfolio"}
        // this.changeView = this.changeView.bind(this);
    }
    
    changeView(view) {
        this.setState({ currentView: view });
        // this.refs[view].className += "active";
    }

    render() {
        return (
            <div>
                <div className="top-navbar">
                    <Route render={({ history }) => (
                        <Button
                            className="logout-button"
                            icon={<i className="fas fa-sign-out-alt"></i>}
                            type='button'
                            onClick={() => { history.push('/login') }}
                        />
                    )} />
                </div>

                <div className="app-body">
                    {this.state.currentView === "portfolio" ? <Portfolio /> : null}
                    {this.state.currentView === "invest" ? <Invest /> : null}
                    {this.state.currentView === "news" ? <News /> : null}
                </div>

                <div className="bottom-navbar">
                    <div
                        ref="invest"
                        onClick={ () => this.changeView('news') } 
                        className={`nav-item`}>
                        <i className="fas fa-newspaper"></i>
                    </div>
                    <div
                        ref="portfolio"
                        onClick={ () => this.changeView('portfolio') }
                        className="nav-item">
                        <i className="fa fa-chart-bar"></i>
                    </div>
                    <div
                        ref="news"
                        onClick={ () => this.changeView('invest') }
                        className="nav-item">
                        <i className="fa fa-user"></i>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    currentView: PropTypes.string
};

export default hot(module)(Home);