import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { docsFetchList, imgFetchList } from './documents'

/**
 * Main saga generator allows several sagas to run at the same time
 * takelatest will prevent multiple calls of the same sagas, it will only
 * respond to the latest
 * see here: https://github.com/yelouafi/redux-saga/tree/master/docs/api#forkfn-args
 */
export function* sagas() {
    yield [
        fork(takeLatest, 'docsFetchList', docsFetchList),
        fork(takeLatest, 'imgFetchList', imgFetchList )
    ];
}
