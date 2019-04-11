import React, { Component } from "react";
import "./Invest.less";
import { hot } from "react-hot-loader";
import { TextInput } from "grommet";
import { strict } from "assert";

class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            visibleShares: [],
            shareList: [{ "id": "AAPL", "name": "Apple Inc." }, { "id": "ADI", "name": "Analog Devices, Inc." }, { "id": "ALGN", "name": "Align Technology, Inc." }, { "id": "ASML", "name": "ASML Holding NV" }, { "id": "BIDU", "name": "Baidu Inc" }, { "id": "BMRN", "name": "BioMarin Pharmaceutical Inc." }, { "id": "CERN", "name": "Cerner Corporation" }, { "id": "CMCSA", "name": "Comcast Corporation" }, { "id": "CSX", "name": "CSX Corporation" }, { "id": "CTSH", "name": "Cognizant Technology Solutions" }, { "id": "EA", "name": "Electronic Arts Inc." }, { "id": "FOX", "name": "Fox Corp Class B" }, { "id": "HSIC", "name": "Henry Schein, Inc." }, { "id": "INCY", "name": "Incyte Corporation" }, { "id": "KHC", "name": "Kraft Heinz Co" }, { "id": "LBTYK", "name": "Liberty Global PLC Class C" }, { "id": "M", "name": "Macy's Inc" }, { "id": "MDLZ", "name": "Mondelez International" }, { "id": "MSFT", "name": "Microsoft Corporation" }, { "id": "NTES", "name": "NetEase Inc" }, { "id": "ORLY", "name": "O'Reilly Automotive Inc" }, { "id": "PEP", "name": "PepsiCo, Inc." }, { "id": "REGN", "name": "Regeneron Pharmaceuticals Inc" }, { "id": "SIRI", "name": "Sirius XM Holdings Inc" }, { "id": "SYMC", "name": "Symantec Corporation" }, { "id": "ULTA", "name": "Ulta Beauty Inc" }, { "id": "VRTX", "name": "Vertex Pharmaceuticals Incorporated" }, { "id": "WDC", "name": "Western Digital Corp" }, { "id": "XEL", "name": "Xcel Energy Inc" }]
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
            s.style.border = "1px solid #ececec"

            that.props.selectedShares.forEach((ss, i) => {
                if (s.id === ss) {
                    document.getElementById(ss).style.backgroundColor = '#03CEA4'
                    document.getElementById(ss).style.border = '1px solid #03CEA4'
                };
            })
        })
    }

    filterShares(e) {
        const results = this.state.shareList.filter((s, i) => {
            if (s.name.toLowerCase().includes(e.toLowerCase())) return s;
        })
        this.setState({visibleShares: results})
    }

    componentDidMount() {
        this.setState({visibleShares: this.state.shareList});
        this.highlightSelectedButtons()
    }
    
    componentDidUpdate() {
        this.highlightSelectedButtons()
    }

    render() {
        return (
            <div className="invest-container">
                <div className="grid">
                    <input
                        placeholder="Filter companies"
                        onChange={event => this.filterShares(event.target.value)}
                    ></input>
                    {
                        this.state.visibleShares.map( (share) => {
                            return (
                                <div 
                                    className="inner-grid" 
                                    id={share.id}
                                    onClick={() => {this.onItemClick(share.id)}}
                                    key={share.id}>
                                    {share.name} ({share.id})
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
