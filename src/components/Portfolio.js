import React, { Component } from "react";
import "./Portfolio.less";
import { hot } from "react-hot-loader";
import { Meter } from "grommet";
import Chart from "chart.js";
import PropTypes from 'prop-types';

const randomColor = require('randomcolor')

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            colorList: ['#DDCECD', '#DDD8B8', '#90B494', '#718F94', '#28AFB0', '#B3CBB9']
        }
    }
    
    componentDidMount() {

        let that = this;
        let i = 0
        let tweenCounter = setInterval(function () {
            i++;
            that.setState({ total: i });
            if (i >= 100) {
                clearInterval(tweenCounter);
            }
        }, 5)

        let sharePriceData = [];
        this.props.shareData.map( (s, i) => {
            let obj = {};
            obj.data = s[Object.keys(s)].map( (p) => p.close);
            obj.borderColor = this.state.colorList[i];
            obj.fill= false;
            sharePriceData.push(obj);
        })

        if (this.props.shareData[0]) {
            new Chart(document.getElementById("line-chart"), {
                type: 'line',
                data: {
                    labels: this.props.shareData[0][Object.keys(this.props.shareData[0])].map((d) => d.label),
                    datasets: sharePriceData
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
                                fontColor: "#fff"
                            },
                            gridLines: {
                                display: false,
                                color: "#FFFFFF"
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "#fff",
                                fontFamily: 'Josefin Sans'
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
    }

    render() {
        return (
            <div className="portfolio-container">
                <div className="meter-container">
                    <Meter
                        className="meter"
                        values={[{
                            value: this.state.total,
                            color: '#69995D',
                            label: 'sixty',
                            onClick: () => { }
                        }]}
                        thickness='small'
                        type="circle"
                        aria-label="meter"
                    />
                    <div className="meter-label">
                        <span>Portfolio Movement</span>
                        <p>+3%</p>
                        <span>for the past 30 Days</span>
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
                                <td>Open</td>
                                <td>Close</td>
                                <td>Change</td>
                            </tr>
                            { 
                                this.props.shareData.map((item, index) => 
                                    <tr key={index} className="table-row">
                                        <td id="name">{Object.keys(item)}</td>
                                        <td id="open">{item[Object.keys(item)][0].open}</td>
                                        <td id="close">{item[Object.keys(item)][0].close}</td>
                                        <td id="change">{item[Object.keys(item)][0].change}%</td>
                                    </tr>
                                )
                            }
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
