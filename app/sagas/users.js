import { call, put } from 'redux-saga/effects';

import ApiUsers from '../api/users';

export function* usersFetchList(action) {
    // call the api to get the users list
    console.log("users fetch list")
    const users = yield call(ApiUsers.getList);
    console.log(users);
    // dispatch the success action with the users attached
    yield put({
        type: 'users.fetchListSuccess',
        users: users,
    });
}

export function* usersAdd(action) {
    // call the api to get the users list
    console.log("users add list")
    console.log(action)
    const users = yield call(ApiUsers.addUser, action);
    yield put({
        type: 'users.addUserSuccess',
        users: users
    });
}

export function* usersEdit(action) {
    yield call(ApiUsers.edit, action);
}

export function* usersDelete(action) {
    yield call(ApiUsers.delete, action);
}
