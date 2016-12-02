import _ from 'lodash';
import { reducerCall } from './index';

/**
 * Wrapping reducers to keep reducers pure
 * see reducers/index.js
 */
export default function tfidf(state = {}, action) {
    return reducerCall(state, action, reducerClass);
}

/**
 * class containing my reducers
 *
 */
class reducerClass {

    /**
     * reducer used when fetching tfidf succeeds. Setting the store state
     * with the tfidf retrieved.
     * @param {object} new state
     * @param {object} action being called with payload from fetcthing tfidf
     *
     */
    static fetchTfidfSuccess(new_state, action) {
        console.log("tfidf", action);
        new_state = action.tfidf;
        return new_state;
    }

}
