import { call, put } from 'redux-saga/effects';

import ApiCol from '../api/collection';
/**
 * Handles the action of fetching collections
 * @param {action} action being dispatched containig the query
 */
export function* collectionFetchList(action) {
    // call the api to get the users list
    const cols = yield call(ApiCol.getCollections);

    // dispatch the success action with the collections from /reducers/collections
    yield put({
        type: 'collections.fetchColSuccess',
        collections: cols,
    });
}

/**
 * Handles the action of posting collections
 * @param {action} action being dispatched containig the post data
 */
export function* collectionPost(action) {
    // call the api to get the users list
    console.log("COLLECTIONS POST LIST", action)
    const cols = yield call(ApiCol.postCollections, action);

    // Call action on post list success
    yield put({
        type: 'collections.postListSuccess',
        collections: cols,
    });
}
