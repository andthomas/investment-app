import * as allActions from './actionTypes';

export function receiveNewsData(json) {
    return { type: allActions.RECEIVE_NEWS_DATA, newsData: json };
}

export function fetchNewsData(shareIds) {
    return (dispatch) => {
        let newsStories = []
        shareIds.map((share) => {
            fetch(`https://gnews.io/api/v3/search?q=${share}&token=b22571f29ed9177645da544c3f32c5bd`)
                .then((response) => {
                    const data = response.json();
                    return data;
                })
                .then((data) => {
                    console.log(data)
                    data.articles.map((n, i) => {
                        if (i < 5) newsStories.push(n);
                    })
                })
        })
        dispatch(receiveNewsData(newsStories))
    };
}
