import _ from 'lodash';
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
        new_state.documents = action.docs.results;
        new_state.count = action.docs.count;
        new_state.pages = action.docs.pages;
        new_state.loading = false;
        new_state.filterOptions = _.merge({}, 
            [action.docs.types, action.docs.domains, action.docs.crawl_years, action.docs.pub_years]
        );
        return new_state;
    }
    /**
     * reducer used when fetching images suceeds
     * @param {object} new state 
     * @param {object} action being called with payload from fetcthing images
     * 
     */
    static fetchImgSuccess(new_state, action) {
        new_state.images = action.img.results;
        new_state.img_count = action.img.count;
        new_state.loading = false;
        return new_state;
    }
    /**
     * reducer used when loading
     * @param {object} new state 
     * @param {object} action being called with payload containing loading state
     * 
     */
    static onLoad(new_state, action) {
        new_state.loading = true;
        return new_state;
    }
}

