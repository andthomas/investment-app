import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter, Chart } from "grommet";

class Portfolio extends Component {
    render() {
        return (
            <div className="portfolio-container">
                
                <div className="meter-container">
                    <Meter
                        className="meter"
                        values={[{
                            value: 60,
                            color: 'white',
                            label: 'sixty',
                            onClick: () => { }
                        }]}
                        thickness='small'
                        type="circle"
                        aria-label="meter"
                        />
                        <div className="meter-label">
                            <span>Portfolio value</span>
                            <p>$6,103</p>
                            <span>61% of $10,000 goal</span>
                        </div>
                </div>

                <div className="chart-container">
                    {/* <Chart
                        type="line"
                        bounds={[[0, 7], [0, 100]]}
                        values={[
                            { value: [7, 100], label: 'one hundred' },
                            { value: [6, 70], label: 'seventy' },
                            { value: [5, 60], label: 'sixty' },
                            { value: [4, 80], label: 'eighty' },
                            { value: [3, 40], label: 'forty' },
                            { value: [2, 0], label: 'zero' },
                            { value: [1, 30], label: 'thirty' },
                            { value: [0, 60], label: 'sixty' },
                        ]}
                        aria-label="chart"
                    /> */}

                </div>
            </div>
        )
    }
}

export default hot(module)(Portfolio);
