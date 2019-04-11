"use strict"
import React, { Component } from "react";
import "./Home.less";
import { hot } from "react-hot-loader";
import { Button } from "grommet";
import { Route } from 'react-router-dom';
import Portfolio from "../components/Portfolio.js";
import Invest from "../components/Invest.js";
import News from "../components/News.js";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shareActions from '../actions/shareActions';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { currentView: "invest",
                       selectedShares: ['AAPL', 'ADBE']
                    }
    }
    
    changeView(view) {
        this.setState({ currentView: view });
        const classes = Array.from(document.getElementsByClassName('nav-item'))
        classes.forEach( (c) => {
            c.style.borderBottom = "0px";
        })
        document.getElementById(view).style.borderBottom = '3px solid white';
    }

    componentDidMount() {
        this.changeView(this.state.currentView)
        this.props.shareActions.fetchShareData(this.state.selectedShares);
    }
    
    updateShareList(selShares) {
        this.setState({selectedShares: selShares})
        this.props.shareActions.fetchShareData(this.state.selectedShares);
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
                    {this.state.currentView === "portfolio" ? <Portfolio shareData={this.props.shareData}/> : null}
                    {this.state.currentView === "invest" ? <Invest selectedShares={this.state.selectedShares} onSelectShares={this.updateShareList.bind(this)}/> : null}
                    {this.state.currentView === "news" ? <News /> : null}
                </div>

                <div className="bottom-navbar">
                    <div
                        id="news"
                        onClick={ () => this.changeView('news') } 
                        className={`nav-item`}>
                        <i className="fas fa-newspaper"></i>
                    </div>
                    <div
                        id="portfolio"
                        onClick={ () => this.changeView('portfolio') }
                        className="nav-item">
                        <i className="fa fa-chart-bar"></i>
                    </div>
                    <div
                        id="invest"
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
    shareActions: PropTypes.object,
    shareData: PropTypes.array,
    currentView: PropTypes.string
};


function mapStateToProps(state) {
    return {
        shareData: state.data.shareData,
        shareList: state.data.shareList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        shareActions: bindActionCreators(shareActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);