import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';

const TYPE_CHOICES = ["HTML", "PDF", "OTHER"]
const DOMAINS = ["web.ca, ca.ca, .com"]
export class Toolbar extends React.Component {
    /**
     * Constructor for FilterOptions component. Initializes state and bind eventlisteners.
     * Fetches image list on construction
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);

        this.filterClick = this.filterClick.bind(this)
    }

    /**
     * render method rendering Images
     * 
     */
    render() {
        return (
            <div className="toolbar">
                <ul>
                    <li> Search </li>
                    <li> Date </li>
                </ul>
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
        typeFilters: ["HTML", "PDF", "OTHER"],
        domainFilters: ["web.ca, ca.ca, .com"],
        yearFilters: ["1991, 1992, 2016"],
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(FilterOptions);
