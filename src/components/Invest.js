import React, { Component } from "react";
import "./Invest.less";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Export unconnected Invest component to allow unit test (without store)
export class Invest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            visibleShares: []
        }
    }

    addToSelectedShares(share) {
        let newShare = true
        this.props.selectedShares.forEach( (s, index) => {
            // Remove double clicked shares if there is more than one left
            if (share === s && this.props.selectedShares.length > 1) {
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

            that.props.selectedShares.forEach((ss) => {
                if (s.id === ss) {
                    document.getElementById(ss).style.boxShadow = '5px 5px 5px rgba(0,153,121,1)'
                };
            })
        })
    }

    filterShares(e) {
        const results = this.props.shareList.filter((s) => {
            if (s.name.toLowerCase().includes(e.toLowerCase())) return s;
        })
        this.setState({visibleShares: results})
    }

    clearFilter() {
        document.getElementById('searchbar').value = '';
        this.filterShares('');
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
                    <i className="fas fa-times"
                        onClick={() => { this.clearFilter()}}>
                    </i>
                    <input
                        id="searchbar"
                        placeholder="Filter NASDAQ"
                        onChange={event => this.filterShares(event.target.value)}
                    ></input>
                    {
                        this.state.visibleShares.map( (share) => {
                            return (
                                <div 
                                    className="inner-grid" 
                                    id={share.id}
                                    onClick={() => {this.addToSelectedShares(share.id)}}
                                    key={share.id}>
                                    <img className="company-logo" src={this.imgUrl(share.icon)} />
                                        <div>
                                        <p><strong className="share-id">{share.id}</strong></p>
                                            <p className="share-name">{share.name}</p>
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

// Default export connect Invest component (with store)
export default connect(
    mapStateToProps
)(Invest);
