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
            movement: 0,
            colorList: ['#3F88C5', '#FFBA08', '#06D6A0', '#28AFB0', '#432534', '#D00000']
        }
    }

    calculateMovement() {
        const openCloseData = this.props.shareData.map((share) => {
            const open = share[Object.keys(share)][0].open;
            const close = share[Object.keys(share)][share[Object.keys(share)].length - 1].close;
            return [open, close]
        })


        let openTotal = 0;
        let closeTotal = 0;
        openCloseData.forEach((s) => {
            openTotal = openTotal + s[0]
            closeTotal = closeTotal + s[1]
        })

        let indMov = closeTotal / openTotal;
        let c;
        if (indMov === NaN) {
            indMov = 0; 
        } else {
            c = Math.round((indMov - 1) * 10000) / 100;
        }

        if (c > 0) c = `+${c}`
        this.setState({movement: c})

    }
    
    componentDidMount() {
        console.log(this.props.shareData)
        this.calculateMovement();

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
                    maintainAspectRatio: false,
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
                                fontColor: "#000000"
                            },
                            gridLines: {
                                display: false,
                                color: "#000000"
                            },
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: "#000000",
                                fontFamily: 'Josefin Sans'
                            },
                            gridLines: {
                                display: false,
                                color: "#000000"
                            },
                        }]
                    }
                }
            });
            document.getElementById("line-chart").height = 500;
            document.getElementById("line-chart").width = 350;
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
                            color: 'rgb(3, 206, 164)',
                            label: 'sixty',
                            onClick: () => { }
                        }]}
                        thickness='small'
                        type="circle"
                        aria-label="meter"
                    />
                    <div className="meter-label">
                        <span>Aggregate Movement</span>
                        <p>{this.state.movement}%</p>
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
                                <td>Current</td>
                                <td>Change</td>
                            </tr>
                            { 
                                this.props.shareData.map((item, index) => 
                                    <tr id={index} key={index} className="table-row">
                                        <td id="name">{Object.keys(item)}</td>
                                        <td id="open">{item[Object.keys(item)][item[Object.keys(item)].length-1].open}</td>
                                        <td id="close">{item[Object.keys(item)][item[Object.keys(item)].length-1].close}</td>
                                        <td id="change">{Math.round(item[Object.keys(item)][item[Object.keys(item)].length-1].changePercent*100)/100}%</td>
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
