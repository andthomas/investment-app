import * as allActions from './actionTypes';

export function receiveShareData(json) {
    return { type: allActions.RECEIVE_SHARE_DATA, shareData: json };
}

export function fetchShareData(shares) {
    return (dispatch) => {
        const shareData = []
        shares.map((s) => {
            fetch(`https://cloud.iexapis.com/beta/stock/${s}/chart/1m?token=sk_53be0e5f18c14df8ae6341b2ab312104`)
            .then((response) => {
                const data = response.json();
                return data;
            })
            .then((data) => {
                shareData.push({[s]: data});
            })
        })
        dispatch(receiveShareData(shareData))
    };
}