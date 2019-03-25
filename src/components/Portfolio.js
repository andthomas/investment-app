import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter } from "grommet";
import Chart from "chart.js";

class Portfolio extends Component {
    componentDidMount() {
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: ["3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar"],
                datasets: [{
                    data: [6023, 6035, 6086, 6079, 6044, 6078, 6103],
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
                    <canvas id="line-chart" width="800" height="450"></canvas>
                </div>
            </div>
        )
    }
}

export default hot(module)(Portfolio);
