import React, { Component } from "react";
import "./Invest.less";
import { hot } from "react-hot-loader";
import { Select } from "grommet";

class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            shareList: ['AAL', 'AAPL', 'ADBE', 'ADI', 'ADP', 'ADSK', 'ALGN', 'ALXN', 'AMAT', 'AMD', 'AMGN', 'AMZN', 'ASML', 'ATVI', 'AVGO', 'BIDU', 'BIIB', 'BKNG', 'BMRN', 'CDNS', 'CELG', 'CERN', 'CHKP', 'CHTR', 'CMCSA', 'COST', 'CSCO', 'CSX', 'CTAS', 'CTRP', 'CTSH', 'CTXS', 'DLTR', 'EA', 'EBAY', 'EXPE', 'FAST', 'FB', 'FISV', 'FOX', 'FOXA', 'GILD', 'GOOG', 'GOOGL', 'HAS', 'HSIC', 'IDXX', 'ILMN', 'INCY', 'INTC', 'INTU', 'ISRG', 'JBHT', 'JD', 'KHC', 'KLAC', 'LBTYA', 'LBTYK', 'LRCX', 'LULU', 'M', 'MAR', 'MCHP', 'MDLZ', 'MELI', 'MNST', 'MSFT', 'MU', 'MXIM', 'MYL', 'NFLX', 'NTAP', 'NTES', 'NVDA', 'NXPI', 'ORLY', 'PAYX', 'PCAR', 'PEP', 'PYPL', 'QCOM', 'REGN', 'ROST', 'SBUX', 'SIRI', 'SNPS', 'SWKS', 'SYMC', 'TMUS', 'TSLA', 'TTWO', 'TXN', 'UAL', 'ULTA', 'VRSK', 'VRSN', 'VRTX', 'WBA', 'WDAY', 'WDC', 'WLTW', 'WYNN', 'XEL', 'XLNX']
        }
    }

    onItemClick(share) {
        let newShare = true
        this.props.selectedShares.forEach( (s, index) => {
            if (share === s) {
                this.props.selectedShares.splice(index, 1)
                newShare = false
            }
        })
        if (newShare) {
            if (this.props.selectedShares.length == 5) return;
            this.props.selectedShares.push(share)
        }
        this.props.onSelectShares(this.props.selectedShares)
    }

    highlightSelectedButtons() {
        const shareButtons = Array.from(document.getElementsByClassName('inner-grid'))
        let that = this;
        shareButtons.forEach((s) => {
            s.style.backgroundColor = "white"

            that.props.selectedShares.forEach((ss, i) => {
                if (s.id === ss) {
                    document.getElementById(ss).style.backgroundColor = '#03CEA4'
                }
            })
        })
    }

    componentDidMount() {
        this.highlightSelectedButtons()
    }
    
    componentDidUpdate() {
        this.highlightSelectedButtons()
    }

    render() {
        return (
            <div className="invest-container">
                <div className="grid">

                    {
                        this.state.shareList.map( (share, index) => {
                            return (
                                <div 
                                    className="inner-grid" 
                                    id={share}
                                    onClick={() => {this.onItemClick(share)}}
                                    key={share}>
                                        {share}
                                </div>
                                )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default hot(module)(Invest);
