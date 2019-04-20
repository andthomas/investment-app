import * as allActions from './actionTypes';

export function receiveShareData(json) {
    return { type: allActions.RECEIVE_SHARE_DATA, shareData: json };
}

export function fetchShareData(shares) {
    return (dispatch) => {
        const shareData = []
        shares.map((s) => {
            fetch(`https://cloud.iexapis.com/beta/stock/${s}/chart/1m?token=sk_3ad5534ea703458bbd448236296a7ef0
`)
            .then((response) => {
                const data = response.json();
                return data;
            })
            .then((data) => {
                shareData.push({[s]: data});
            })
        })

        if (shareData !== []) {
            dispatch(receiveShareData(shareData))
        }
    };
}
