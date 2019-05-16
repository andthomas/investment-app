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
            total: 0,
            movement: 0,
            colorList: ['#3F88C5', '#FFBA08', '#06D6A0', '#28AFB0', '#432534', '#D00000'],
            circleColor: 'rgb(3, 206, 164)'
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
        this.calculateMovement();

        this.setState({ circleColor: (this.state.movement > 0 ? 'rgb(3, 206, 164)' : '#f00')});

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
                            color: this.state.circleColor,
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
                    {
                        this.props.shareData.map((item, index) => 
                            <div className="share-details" key={index}>
                                <div className="color-bar">
                                </div>
                                <div className="content-container">
                                    <p className="name">{Object.keys(item)}</p>
                                    <div className="price-details">
                                        <div>
                                            <p>Open</p>
                                            <p>{item[Object.keys(item)][item[Object.keys(item)].length - 1].open}</p>
                                        </div>
                                        <div>
                                            <p>High</p>
                                            <p>{item[Object.keys(item)][item[Object.keys(item)].length - 1].high}</p>
                                        </div>
                                        <div>
                                            <p>Low</p>
                                            <p>{item[Object.keys(item)][item[Object.keys(item)].length - 1].low}</p>
                                        </div>
                                        <div>
                                            <p>Current</p>
                                            <p>{item[Object.keys(item)][item[Object.keys(item)].length - 1].close}</p>
                                        </div>
                                        <div>
                                            <p>Change</p>
                                            <p>{Math.round(item[Object.keys(item)][item[Object.keys(item)].length - 1].changePercent * 100) / 100}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

Portfolio.propTypes = {
    total: PropTypes.number,
    shareData: PropTypes.array
};

export default hot(module)(Portfolio);
