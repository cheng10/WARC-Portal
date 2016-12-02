import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
import {getHost} from '../config.js';

/**
 * Interface for xhr requests to retrieve tfidf
 * from server
 * 
 * @class ApiTfidf
 */
export default class ApiTfidf {

    /**
     * Retrieve filter options
     * @param {object} action contains keywords/page properties 
     */
    static getTfidf(action) {
        console.log('action', action);
        let list = [];
        return fetch(`${getHost()}/tf-idf/${action.value}`).then((res) => {
            return res.json();
        }).then((list) => {
            return list;
        });
    }
}
