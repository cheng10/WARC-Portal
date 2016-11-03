import { call, put } from 'redux-saga/effects';

import ApiDocs from '../api/document';

export function* docsFetchList(action) {
    // call the api to get the users list
    console.log("users fetch list", action)
    const docs = yield call(ApiDocs.getDocs, action.query);
    // dispatch the success action with the users attached
    yield put({
        type: 'docs.fetchListSuccess',
        docs: docs,
    });
}

export function* imgFetchList(action) {
    // call the api to get the users list
    console.log("users fetch list", action)
    const img = yield call(ApiDocs.getImages, action.query);
    // dispatch the success action with the users attached
    yield put({
        type: 'docs.fetchImgSuccess',
        img: img,
    });
}