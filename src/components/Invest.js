import React, { Component } from "react";
import "./Invest.less";
import { hot } from "react-hot-loader";
import { Select } from "grommet";

class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    onItemClick(share) {
        console.log(share)
    }

    render() {
        return (
            <div className="invest-container">
            <div className="grid">

                {
                    this.props.shareList.map( (share, index) => {
                        return (
                            <div 
                                className="inner-grid" 
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
