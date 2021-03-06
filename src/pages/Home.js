"use strict"
import React, { Component } from "react";
import "./Home.less";
import { Button } from "grommet";
import { Route } from 'react-router-dom';
import Portfolio from "../components/Portfolio.js";
import Invest from "../components/Invest.js";
import News from "../components/News.js";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as shareActions from '../actions/shareActions';
import * as newsActions from '../actions/newsActions';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentView: "invest",
            selectedShares: ['AAPL', 'BIDU'],
            fetchedNews: []
        }
    }
    
    changeView(view) {
        this.setState({ currentView: view });
        const classes = Array.from(document.getElementsByClassName('nav-button'))
        classes.forEach( (c) => {
            c.style.color = "#d6d6d6";
        })
        document.getElementById(view).style.color = '#001b4a';
    }

    componentDidMount() {
        this.changeView(this.state.currentView)
        this.props.shareActions.fetchShareData(this.state.selectedShares);
        this.props.newsActions.fetchNewsData(this.state.selectedShares);
    }
    
    updateShareList(selShares) {
        this.setState({selectedShares: selShares})
        this.props.shareActions.fetchShareData(this.state.selectedShares);
        this.props.newsActions.fetchNewsData(this.state.selectedShares);
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
                    {this.state.currentView === "news" ? <News currentNews={this.props.newsData}/> : null}
                </div>

                <div className="bottom-navbar">
                    <div
                        onClick={ () => this.changeView('news') } 
                        className={`nav-item`}>
                        <i id="news" className="fas fa-newspaper nav-button"></i>
                    </div>
                    <div
                        onClick={ () => this.changeView('portfolio') }
                        className="nav-item">
                        <i id="portfolio" className="fa fa-chart-bar nav-button"></i>
                    </div>
                    <div  
                        onClick={ () => this.changeView('invest') }
                        className="nav-item">
                        <i id="invest" className="fas fa-clipboard-list nav-button"></i>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    shareActions: PropTypes.object,
    newsActions: PropTypes.object,
    shareData: PropTypes.array,
    newsData: PropTypes.array,
    currentView: PropTypes.string
};

function mapStateToProps(state) {
    return {
        shareData: state.data.shareData,
        newsData: state.data.newsData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        shareActions: bindActionCreators(shareActions, dispatch),
        newsActions: bindActionCreators(newsActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);