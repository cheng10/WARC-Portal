import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
import {getHost} from '../config.js';

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
        let collections = [];
        return fetch(`${getHost()}/collection/`).then((res) => {
            return res.json();
        }).then((collections) => {
            return collections;
        });

    }

    /**
     * Retrieve collections
     * @param {object} action contains keywords/page properties
     */
    static getFiles(action) {
        let files = [];
        return fetch(`${getHost()}/warcfile/`).then((res) => {
            return res.json();
        }).then((files) => {
            return files;
        });
    }

    /**
     * Post collections
     * @param {object} action contains keywords/page properties
     */

    static postCollections(action) {
        let collections = {};
        const token = sessionStorage.token;
        collections["name"] = action['name'];
        collections["detail"] = "";
        let files = [];
        for (var i = 0; i < action['warcFiles'].length; i++) {
          files[i] = {"name": action['warcFiles'][i]};
        }
        collections["file"] = files;
        let data = fetch(`${getHost()}/collection/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
          },
          body: JSON.stringify(collections)
        })
        return data;
    }
}
