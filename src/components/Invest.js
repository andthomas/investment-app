import React, { Component } from "react";
import "./Invest.less";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            visibleShares: [],
        }
    }

    onItemClick(share) {
        let newShare = true
        this.props.selectedShares.forEach( (s, index) => {
            if (share === s) {
                this.props.selectedShares.splice(index, 1);
                newShare = false;
            }
        })
        if (newShare) {
            if (this.props.selectedShares.length == 5) return;
            this.props.selectedShares.push(share);
        }
        this.props.onSelectShares(this.props.selectedShares);
    }

    highlightSelectedButtons() {
        const shareButtons = Array.from(document.getElementsByClassName('inner-grid'))
        let that = this;
        shareButtons.forEach((s) => {
            s.style.boxShadow = "5px 5px 5px rgba(0,0,0,0.2)"

            that.props.selectedShares.forEach((ss, i) => {
                if (s.id === ss) {
                    document.getElementById(ss).style.boxShadow = '5px 5px 5px rgba(0,153,121,1)'
                };
            })
        })
    }

    filterShares(e) {
        const results = this.props.shareList.filter((s, i) => {
            if (s.name.toLowerCase().includes(e.toLowerCase())) return s;
        })
        this.setState({visibleShares: results})
    }

    componentDidMount() {
        this.setState({visibleShares: this.props.shareList});
        this.highlightSelectedButtons()
    }
    
    componentDidUpdate() {
        this.highlightSelectedButtons()
    }

    imgUrl(img) {
        return `https://res.cloudinary.com/djq5ic5br/image/upload/c_scale,h_120/${img}`
    }

    render() {
        return (
            <div className="invest-container">
                <div className="grid">
                    <input
                        placeholder="Filter NASDAQ"
                        onChange={event => this.filterShares(event.target.value)}
                    ></input>
                    {
                        this.state.visibleShares.map( (share) => {
                            return (
                                <div 
                                    className="inner-grid" 
                                    id={share.id}
                                    onClick={() => {this.onItemClick(share.id)}}
                                    key={share.id}>
                                    <img src={this.imgUrl(share.icon)} />
                                        <div>
                                            <p><strong>{share.id}</strong></p>
                                            <p>{share.name}</p>
                                        </div>
                                </div>
                                )
                        })
                    }

                </div>
            </div>
        );
    }
}

Invest.propTypes = {
    selectedShares: PropTypes.array,
    shareList: PropTypes.array
}

function mapStateToProps(state) {
    return {
        shareList: state.data.shareList
    };
}

export default connect(
    mapStateToProps
)(Invest);
