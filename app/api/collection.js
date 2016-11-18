import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
/**
 * Interface for xhr requests to retrieve collections
 * from server
 * 
 * @class ApiCol
 */
export default class ApiCol {

    /**
     * Retrieve collections
     * @param {object} action contains keywords/page properties 
     */
    static getCollections(action) {
        console.log("API get collections", action);
        let collections = [];
        return fetch(`http://warc.tech:8000/collection/`).then((res) => {
            console.log(res);
            return res.json();
        }).then((collections) => {
            console.log(collections);
            return collections;
        });
    }

    /**
     * Post collections
     * @param {object} action contains keywords/page properties 
     */

    // TODO: fill out. checkout https://github.com/github/fetch#post-json
    static postCollections(action) {
        console.log("API POST collections", action);
        let collections = [];
        return "new collections list"
    }
}
