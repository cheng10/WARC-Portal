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
        console.log(action);
        return new_state;
    }
}
