import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
import {getHost} from '../config.js';

/**
 * Interface for xhr requests to retrieve documents
 * from server
 * 
 * @class ApiDocs
 */
export default class ApiDocs {

    /**
     * Retrieve documents
     * @param {object} action contains keywords/page properties 
     */
    static getDocs(action) {
        const url = URLBuilder(action);
        // TODO: UNHARDCODE URLS
        let list = [];
        return fetch(`${getHost()}/documents/${url}`).then((res) => {
            return res.json();
        }).then((list) => {
            return list;
        });
    }

    /**
     * Retrieve documents
     * @param {object} action retrieve pictures
     */
    static getImages(action) {
        const url = URLBuilder(action);
        let list = [];
        return fetch(`${getHost()}/image/${url}`).then((res) => {
            return res.json();
        }).then((list) => {
            return list;
        });
    }
}
