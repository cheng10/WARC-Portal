
 /**
 * helper function to map an object to query values
 * @param {object} object containing query and value as k/v
 * @return {string} queryparam url
 */
export default function URLBuilder(query) {
    console.log("URLBUILDER", query);
    let url = '';
    if (!_.isEmpty(query)) {
        url +='?';
        _.forEach(query, (value, key) => {
            console.log(key);
            url+=`&${key}=${value}`
        });
    }
    console.log(url);
    return url;
}
