import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
/**
 * Interface for xhr requests to retrieve documents
 * from server
 * 
 * @class ApiDocs
 */
export default class ApiAuth {

    /**
     * Retrieve filter options
     * @param {object} action contains keywords/page properties 
     */
    static login(action) {
        console.log("action", action);
        // TODO: UNHARDCODE URLS
        let list = [];
        
        return fetch('http://warc.tech:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(action)
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log("AUTH RESP", response);
            return {
                response: response
            };
        });
    }
}
