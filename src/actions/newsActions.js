import * as allActions from './actionTypes';

export function receiveNewsData(json) {
    return { type: allActions.RECEIVE_NEWS_DATA, newsData: json };
}

export function fetchNewsData(shareIds) {
    return (dispatch) => {
        let newsStories = []
        shareIds.map((share) => {
            fetch(`https://newsapi.org/v2/everything?language=en&q=${share}&apiKey=87903eb739404351971c2d3106d16e7e`)
                .then((response) => {
                    const data = response.json();
                    return data;
                })
                .then((data) => {
                    data.articles.map((n, i) => {
                        if (i < 5) newsStories.push(n);
                    })
                })
        })
        dispatch(receiveNewsData(newsStories))
    };
}
