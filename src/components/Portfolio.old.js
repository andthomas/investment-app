import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter } from "grommet";
import Chart from "chart.js";
import PropTypes from 'prop-types';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = { total: 0 };
    }

    componentDidMount() {
        let that = this;
        let i = 0
        let tweenCounter = setInterval( function() {
            i ++;
            that.setState({total: i});
            if (i >= 60 ) {
                clearInterval(tweenCounter);
            }
        }, 10)

        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: ["3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar"],
                datasets: [{
                    data: [6023, 6035, 6086, 6079, 6044, 6078, 6190],
                    borderColor: "#fff",
                    fill: false
                }]
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontFamily: 'Josefin Sans',
                            maxTicksLimit: 3,
                            fontColor: "#fff",
                            userCallback: function (value, index, values) {
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value;
                            }
                        },
                        gridLines: {
                            display: false,
                            color: "#FFFFFF"
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "#fff",
                            fontFamily: 'Josefin Sans',
                        },
                        gridLines: {
                            display: false,
                            color: "#FFFFFF"
                        },
                    }]
                }
            }
        });
    }
    render() {
        return (
            <div className="portfolio-container">
                
                <div className="meter-container">
                    <Meter
                        className="meter"
                        values={[{
                            value: this.state.total,
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
                    <canvas id="line-chart" width="800" height="450"></canvas>
                </div>

                <div className="table-container">
                    <table>
                        <tbody>
                            <tr className="table-head">
                                <td>Share</td>
                                <td>Price</td>
                                <td>Volume</td>
                                <td>Total</td>
                            </tr>
                            <tr className="table-row">
                                <td>TLS</td>
                                <td>$2</td>
                                <td>100</td>
                                <td>$200</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

Portfolio.propTypes = {
    total: PropTypes.number
};

export default hot(module)(Portfolio);
