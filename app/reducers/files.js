import _ from 'lodash';
import { reducerCall } from './index';

/**
 * Wrapping reducers to keep reducers pure
 * see reducers/index.js
 */
export default function files(state = {}, action) {
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

    static fetchFilesSuccess(new_state, action) {
        console.log("fetch files success", action);
        new_state = action.files.results;
        return new_state;
    }

}
