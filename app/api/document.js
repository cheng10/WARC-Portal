import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
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
        console.log("action", action);
        const url = URLBuilder(action);

        let list = [];
        return fetch(`http://warc.tech:8000/documents/${url}`).then((res) => {
            return res.json();
        }).then((list) => {
            console.log(list)
            return list;
        });
    }

    /**
     * Retrieve documents
     * @param {object} action retrieve pictures
     */
    static getImages(action) {
        console.log("image action", action);
        const url = URLBuilder(action);
        console.log(url);
        let list = [];
        return fetch(`http://warc.tech:8000/image/${url}`).then((res) => {
            return res.json();
        }).then((list) => {
            console.log(list)
            return list;
        });
    }
}
