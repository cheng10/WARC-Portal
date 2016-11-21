import { call, put } from 'redux-saga/effects';

import ApiCol from '../api/collection';
/**
 * Handles the action of fetching files
 * @param {action} action being dispatched containig the query
 */

export function* filesFetchList(action) {
    // call the api to get the users list
    console.log("collections fetch list", action)
    const files = yield call(ApiCol.getFiles);

    // dispatch the success action with the collections from /reducers/collections
    yield put({
        type: 'files.fetchFilesSuccess',
        files: files,
    });
}
