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
        this.state = { currentView: "news",
                       selectedShares: ['m', 'gps'],
                       shareList: ['AAL', 'AAPL', 'ADBE', 'ADI', 'ADP', 'ADSK', 'ALGN', 'ALXN', 'AMAT', 'AMD', 'AMGN', 'AMZN', 'ASML', 'ATVI', 'AVGO', 'BIDU', 'BIIB', 'BKNG', 'BMRN', 'CDNS', 'CELG', 'CERN', 'CHKP', 'CHTR', 'CMCSA', 'COST', 'CSCO', 'CSX', 'CTAS', 'CTRP', 'CTSH', 'CTXS', 'DLTR', 'EA', 'EBAY', 'EXPE', 'FAST', 'FB', 'FISV', 'FOX', 'FOXA', 'GILD', 'GOOG', 'GOOGL', 'HAS', 'HSIC', 'IDXX', 'ILMN', 'INCY', 'INTC', 'INTU', 'ISRG', 'JBHT', 'JD', 'KHC', 'KLAC', 'LBTYA', 'LBTYK', 'LRCX', 'LULU', 'M', 'MAR', 'MCHP', 'MDLZ', 'MELI', 'MNST', 'MSFT', 'MU', 'MXIM', 'MYL', 'NFLX', 'NTAP', 'NTES', 'NVDA', 'NXPI', 'ORLY', 'PAYX', 'PCAR', 'PEP', 'PYPL', 'QCOM', 'REGN', 'ROST', 'SBUX', 'SIRI', 'SNPS', 'SWKS', 'SYMC', 'TMUS', 'TSLA', 'TTWO', 'TXN', 'UAL', 'ULTA', 'VRSK', 'VRSN', 'VRTX', 'WBA', 'WDAY', 'WDC', 'WLTW', 'WYNN', 'XEL', 'XLNX']
                    }
        // this.changeView = this.changeView.bind(this);
    }
    
    changeView(view) {
        this.setState({ currentView: view });
        const classes = Array.from(document.getElementsByClassName('nav-item'))
        classes.forEach( (c) => {
            c.style.borderBottom = "0px";
        })
        console.log(document.getElementById(view))
        document.getElementById(view).style.borderBottom = '3px solid white';
    }

    componentDidMount() {
        this.changeView(this.state.currentView)
        // Dispatch action to fetch the share data
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
                    {this.state.currentView === "invest" ? <Invest shareList={this.state.shareList}/> : null}
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
    console.log(state)
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