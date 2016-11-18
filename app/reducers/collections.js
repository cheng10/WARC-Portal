import _ from 'lodash';
import { reducerCall } from './index';

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
        console.log("fetch collections success");
        new_state = action.collections;
        return new_state;
    }

    // TODO: fill out. Maybe make the collections api return the new set of collections on POST and set it as the state.
    static postColSuccess(new_state, action) {
        console.log("fetch collections success");
        return new_state;
    }
}

