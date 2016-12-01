// Location of Django web server
const HOST = "http://warc.tech:8000";

// Location of openWayback host for archived webpages
const WAYBACK = "https://warc.tech:8080/warc_portal";

export function getHost() {
    if (process.env.NODE_ENV === 'production') {
        return HOST;
    } else {
        return HOST;
    }
}

export function getWayback() {
    if (process.env.NODE_ENV === 'production') {
        return WAYBACK;
    } else {
        return WAYBACK;
    }
}