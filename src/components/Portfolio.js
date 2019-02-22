import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter } from "grommet";

class Portfolio extends Component {
    render() {
        return (
            <div>

                <div className="meter-container">
                    <Meter
                        className="meter"
                        values={[{
                            value: 60,
                            color: 'white',
                            label: 'sixty',
                            onClick: () => { }
                        }]}
                        thickness='large'
                        type="circle"
                        aria-label="meter"
                    />
                            <div className="meter-label">
                                <p>60.0%</p>
                            </div>
                </div>
            </div>
        )
    }
}

export default hot(module)(Portfolio);
