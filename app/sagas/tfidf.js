import { call, put } from 'redux-saga/effects';

import ApiTfidf from '../api/tfidf';
/**
 * Handles the action of fetching files
 * @param {action} action being dispatched containig the query
 */

export function* tfidfFetch(action) {
    // call the api to get the users list
    console.log("SAGAS TFIDF")
    const tfidf = yield call(ApiTfidf.getTfidf, action.id);

    // dispatch the success action with the collections from /reducers/collections
    yield put({
        type: 'tfidf.fetchTfidfSuccess',
        tfidf: tfidf,
    });
}
