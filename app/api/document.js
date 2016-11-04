import _ from 'lodash';
import URLBuilder from '../helpers/URLBuilder.js';
/**
 * @author: Kevin Tang
 *
 * Classes for retrieving documents from the back end server
 *
 * getDocs works with types of documents
 * getImages works on images.
 */
export default class ApiDocs {
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

    static getImages(action) {
        console.log("action", action);
        const url = URLBuilder(action);

        let list = [];
        return fetch(`http://warc.tech:8000/image/`).then((res) => {
            return res.json();
        }).then((list) => {
            console.log(list)
            return list;
        });
    }
}
