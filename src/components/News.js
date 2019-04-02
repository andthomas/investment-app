import React, { Component } from "react";
import "./News.less";
import { hot } from "react-hot-loader";

class News extends Component {
    constructor(props) {
        super(props)
        this.state = {currentNews: []}
    }
    
    componentDidMount() {
        const req = new Request('https://newsapi.org/v2/top-headlines?q=finance&from=2019-03-02&sortBy=publishedAt&apiKey=87903eb739404351971c2d3106d16e7e')
        fetch(req)
        .then( (response) => {
            const data = response.json();
            return data;
        })
        .then( (data) => {
            this.setState({currentNews: data.articles})
            console.log(this.state.currentNews)
        })
    }
    render() {
        return (
            <div className={`news`}>
                    {this.state.currentNews.map((item, key) =>
                        <div
                            key={key}>
                            <div className={`news-tile`}>
                                <img className={`news-item`} src={item.urlToImage}/>
                                <div className={`news-title`}>{item.title}</div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

export default hot(module)(News);
