import React, { Component } from "react";
import "./News.less";
import { hot } from "react-hot-loader";
import PropTypes from 'prop-types';

class News extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={`news`}>
                    {   
                        this.props.currentNews.map((item, key) =>
                            <div
                                key={key}>
                                <div className={`news-tile`}>
                                    <img className={`news-item`} src={item.urlToImage}/>
                                    <div className={`news-title`}>{item.title}</div>
                                    <div className={`news-subtitle`}>{item.source.name}</div>
                                    <div className={`news-description`}>{item.description}</div>
                                </div>
                            </div>
                        )
                    }
            </div>
        );
    }
}

News.propTypes = {
    currentNews: PropTypes.array
};

export default hot(module)(News);
