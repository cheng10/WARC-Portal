import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
/**
 * Interface for xhr requests to retrieve documents
 * from server
 * 
 * @class ApiDocs
 */
export default class ApiFilter {

    /**
     * Retrieve filter options
     * @param {object} action contains keywords/page properties 
     */
    static getFilters(action) {
        console.log("action", action);
        const url = URLBuilder(action);
        // TODO: UNHARDCODE URLS
        let list = [];
        return fetch(`http://warc.tech:8000/filters/`).then((res) => {
            return res.json();
        }).then((list) => {
            return list;
        });
    }
}
