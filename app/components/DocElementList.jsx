import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button, Glyphicon, ListGroupItem} from 'react-bootstrap';

/*
* React component for the individual elements of the list on homepage.
*
*/

export default class DocElementList extends React.Component {
    render() {
        const doc = this.props.document;

        return (
            <ListGroupItem data-id={1} >
                <div className="docs-title">
                    <span className="docs-title-font">{doc.title}</span>
                </div>
                <div className="docs-body">
                    <div className="docs-crawldate">Crawl Date: {doc.crawl_date} </div>
                    <div className="docs-pubdate">Pub Date: {doc.pub_date} </div>
                    <div className="docs-link"> {doc.link} </div>
                </div>
            </ListGroupItem>
        );
    }
}
