import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button, Glyphicon, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

/**
 * Renders list of elements used for the Document list
 * 
 * App
 * @extends {React.Component}
 */
export default class DocElementList extends React.Component {

    /**
     * Render method rendering single document of a document list
     */
    render() {
        const doc = this.props.document;
        const crawl_date = doc.crawl_date
        // Replace this with regex
        const cDate = _.replace(crawl_date.split("T")[0], "-", "");
        const crawlDate = _.replace(cDate, "-", "");
        
        // TODO: set a config.js for domains
        const link = `http://www.warc.tech:8080/warc_portal/${crawlDate}/${doc.link}`;

        return (
            <ListGroupItem data-id={1} >
                <div className="docs-title">
                    <a href={link}> <span className="docs-title-font">{doc.title}</span> </a>
                </div>
                <div className="docs-body">
                    <div className="docs-crawldate">Crawl Date: {crawl_date} </div>
                    <div className="docs-pubdate">Pub Date: {doc.pub_date} </div>
                    <div className="docs-link"> {doc.link} </div>
                </div>
            </ListGroupItem>
        );
    }
}
