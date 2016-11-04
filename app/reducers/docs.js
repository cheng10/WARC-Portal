import { reducerCall } from './index';

/**
 * Wrapping reducers to keep reducers pure
 * see reducers/index.js
 */
export default function docs(state = {}, action) {
    return reducerCall(state, action, reducerClass);
}

/**
 * class containing my reducers
 * 
 */
class reducerClass {
    /**
     * reducer used when fetching lists suceeds
     * @param {object} new state 
     * @param {object} action being called with payload from fetcthing lists
     * 
     */
    static fetchListSuccess(new_state, action) {
        console.log("fetch list success", action.docs.results);
        new_state.documents = action.docs.results;
        new_state.count = action.docs.count;
        new_state.loading = false;
        console.dir(new_state);
        return new_state;
    }
    /**
     * reducer used when fetching images suceeds
     * @param {object} new state 
     * @param {object} action being called with payload from fetcthing images
     * 
     */
    static fetchImgSuccess(new_state, action) {
        console.log("fetch images success", action.img);
        new_state.images = action.img.results;
        console.dir(new_state);
        return new_state;
    }
    /**
     * reducer used when loading
     * @param {object} new state 
     * @param {object} action being called with payload containing loading state
     * 
     */
    static onLoad(new_state, action) {
        console.log("onload");
        new_state.loading = true;
        return new_state;
    }
}

