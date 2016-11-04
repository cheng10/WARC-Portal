import { call, put } from 'redux-saga/effects';

import ApiDocs from '../api/document';
/**
 * Handles the action of fetching documents
 * @param {action} action being dispatched containig the query
 */
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

/**
 * Handles the action of fetching images
 * @param {action} action being dispatched containing the query
 */
export function* imgFetchList(action) {
    // call the api to get the users list
    console.log("image fetch list", action)
    const img = yield call(ApiDocs.getImages, action.query);
    // dispatch the success action with the users attached
    yield put({
        type: 'docs.fetchImgSuccess',
        img: img,
    });
}