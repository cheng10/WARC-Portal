import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
import {getHost} from '../config.js';

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
        let list = [];
        return fetch(`${getHost()}/filters/`).then((res) => {
            return res.json();
        }).then((list) => {
            return list;
        });
    }
}
