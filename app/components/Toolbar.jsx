import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import _ from 'lodash';

const CATEGORIES = ["HTML", "PDF", "OTHER"]
const DOMAINS = ["web.ca, ca.ca, .com"]
export class Toolbar extends React.Component {
    /**
     * Constructor for Toolbar component. Initializes state and bind eventlisteners.
     *
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);

    }

    /**
     * render method rendering toolbar
     * 
     */
    render() {
        return (
            <div className="toolbar">
                <ul className="toolbar-list">
                    <li> Category </li>
                    <li> Crawl Date </li>
                    <li> Publish Date </li>
                </ul>
                <span> Advanced Search </span>
            </div>
        );
    }
}

/**
 * Mapping props from state received from store
 */
function mapStateToProps(state) {
    console.log("Image state", state);
    return {
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        categories: ["HTML", "PDF", "OTHER"],
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(Toolbar);
