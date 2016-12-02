import _ from 'lodash';
import { reducerCall } from './index';
import {browserHistory} from 'react-router';

/**
 * Wrapping reducers to keep reducers pure
 * see reducers/index.js
 */
export default function collections(state = {}, action) {
    return reducerCall(state, action, reducerClass);
}

/**
 * class containing my reducers
 *
 */
class reducerClass {
    /**
     * reducer used when fetching collections succeeds. Setting the store state
     * with the new collection retrieved.
     * @param {object} new state
     * @param {object} action being called with payload from fetcthing lists
     *
     */
    static fetchColSuccess(new_state, action) {
        new_state = action.collections;
        return new_state;
    }

    /**
     * reducer used when posting collections succeeds. Setting the store state
     * with the new collection posted.
     * @param {object} new state
     * @param {object} action
     *
     */
    static postColSuccess(new_state, action) {
        console.log("collection success");
        new_state.loading = false;
        new_state.success = true;
        return new_state;
    }

    static postColFail(new_state, action) {
        console.log("collection fail");
        new_state.success = false;
        return new_state;
    }

    static collectionLoad(new_state, action) {
        console.log("collection load");
        new_state.loading = true;
        return new_state
    }
}
