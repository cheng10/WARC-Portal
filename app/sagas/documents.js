import { call, put } from 'redux-saga/effects';

import ApiDocs from '../api/document';

export function* docsFetchList(action) {
    // call the api to get the users list
    console.log("users fetch list", action)
    const docs = yield call(ApiDocs.getDocs, action.page);
    // dispatch the success action with the users attached
    yield put({
        type: 'docs.fetchListSuccess',
        docs: docs,
    });
}
