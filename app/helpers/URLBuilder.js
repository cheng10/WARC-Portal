export default function URLBuilder(query) {
    console.log("URLBUILDER");
    let url = '';
    if (!_.isEmpty(query)) {
        url +='?';
        _.forEach(query, (value, key) => {
            url+=`&${key}=${value}`
        });
    }
    console.log(url);
    return url;
}
