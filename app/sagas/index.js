import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { docsFetchList, imgFetchList } from './documents'

/**
 * Main saga generator
 */
export function* sagas() {
    yield [
        fork(takeLatest, 'docsFetchList', docsFetchList),
        fork(takeLatest, 'imgFetchList', imgFetchList )
    ];
}
