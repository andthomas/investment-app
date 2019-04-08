import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter } from "grommet";
import Chart from "chart.js";
import PropTypes from 'prop-types';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRange: [],
            shareDataRange: [],
            shares: ['aapl']
        }
    }
    
    componentDidMount() {

        console.log(this.props.shareData)

        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: this.props.shareData.map((p) => p.label),
                datasets: [{
                    data: this.props.shareData.map((p) => p.close),
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
                            maxTicksLimit: 9,
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

    renderData(item, index) {
        return <tr key={index} className="table-row">
                    <td key={index} id="name">{ Object.keys(item) }</td>
                    <td key={index} id="open">{ item[Object.keys(item)][0].open }</td>
                    <td key={index} id="close">{ item[Object.keys(item)][0].close }</td>
                    <td key={index} id="change">{ item[Object.keys(item)][0].change }%</td>
                </tr>;
    }

    render() {
        return (
            <div className="portfolio-container">
                <div className="chart-container">
                    <canvas id="line-chart" width="800" height="450"></canvas>
                </div>

                <div className="table-container">
                    <table>
                        <tbody>
                            <tr className="table-head">
                                <td>Share</td>
                                <td>Open</td>
                                <td>Close</td>
                                <td>Change</td>
                            </tr>
                            { 
                                this.props.shareData.map((item, index) => {
                                    return (
                                        this.renderData(item)
                                    )
                                }) 
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

Portfolio.propTypes = {

};

export default hot(module)(Portfolio);
