import { call, put } from 'redux-saga/effects';
import {browserHistory} from 'react-router';

function setAuthAndRedirect(token, author) {
    sessionStorage.setItem("token", token);
    browserHistory.push('/search');
}

import ApiAuth from '../api/auth';

/**
 * Handles the action of logging in and sets the token in sessionStorage
 * 
 * @param {action} action being dispatched containig the login
 */
export function* authLogin(action) {
    // call the api to get the users list
    console.log("collections fetch list", action)
    try {
        const response = yield call(ApiAuth.login, action);
        console.log(response.token);
        // dispatch the success action with the collections from /reducers/collections
        yield put({
            type: 'auth.loginSuccess',
            response: response.response
        });
        setAuthAndRedirect(response.response.token);
    } catch (error) {
        yield put({
            type: 'auth.loginFailure',
            error: error
        });
    }
}
