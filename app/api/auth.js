import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
import {getHost} from '../config.js';

/**
 * Interface for xhr requests to retrieve documents
 * from server
 * 
 * @class ApiDocs
 */
export default class ApiAuth {

    /**
     * Post login names and retrieve token
     * @param {object} action contains login properties 
     */
    static login(action) {
        let list = [];
        
        return fetch(`${getHost()}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(action)
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((response) => {
            return {
                response: response
            };
        });
    }
}
