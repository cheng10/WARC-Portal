import { reducerCall } from './index';

/**
 * Wrapping reducers to keep reducers pure
 * see reducers/index.js
 */
export default function auth(state = {}, action) {
    return reducerCall(state, action, reducerClass);
}

/**
 * class containing my reducers
 *
 */
class reducerClass {
    /**
     * reducer used when login succeeds. 
     * @param {object} new state
     * @param {object} action being called with payload from fetcthing lists
     *
     */
    static loginSuccess(new_state, action) {
        new_state.login = true;
        new_state.loginAttempt = true;
        return new_state;
    }

    static loginFailure(new_state, action) {
        console.log('error', action);
        new_state.login = false;
        new_state.loginAttempt = true;
        new_state.error = action;
        console.dir(new_state);
        return new_state;
    }
}
