import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter } from "grommet";
import Chart from "chart.js";

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
                                <td>Date</td>
                                <td>Investment</td>
                                <td>Total</td>
                            </tr>
                            <tr className="table-row">
                                <td>8 Mar</td>
                                <td>$20</td>
                                <td>$6,180</td>
                            </tr>
                            <tr className="table-row">
                                <td>3 Mar</td>
                                <td>$3</td>
                                <td>$6,064</td>
                            </tr>
                            <tr className="table-row">
                                <td>2 Mar</td>
                                <td>$15</td>
                                <td>$6,050</td>
                            </tr>
                            <tr className="table-row">
                                <td>26 Feb</td>
                                <td>$12</td>
                                <td>$6,023</td>
                            </tr>
                            <tr className="table-row">
                                <td>20 Feb</td>
                                <td>$10</td>
                                <td>$5,950</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default hot(module)(Portfolio);
