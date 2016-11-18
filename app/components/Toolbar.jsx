import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import DateField from './DateField.jsx';

import Select from 'react-select';
import moment from 'moment';
import _ from 'lodash';

const CATEGORIES = ["HTML", "PDF", "OTHER"]
const DOMAINS = ["web.ca, ca.ca, .com"]
const options = [
    { value: 'one', label: 'Politics' },
    { value: 'two', label: 'Canada' }
];
export class Toolbar extends React.Component {
    /**
     * Constructor for Toolbar component. Initializes state and bind eventlisteners.
     *
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);

    }

    logChange(val) {
        console.log("Selected: " + val);
    }

    /**
     * render method rendering toolbar
     * 
     */
    render() {
        return (
            <div className="toolbar">
                <div className="toolbar-list">
                    <div className="category-selector"> 
                        Collection 
                        <Select
                            name="form-field-name"
                            value="one"
                            options={options}
                            onChange={this.logChange}
                        />                    
                    </div>
                    <div className="publish-date-selector"> 
                        Publish Date 
                        <div className="date-inputs-container">
                            <DateField placeholder="From"/>
                            <DateField placeholder="To"/>
                        </div>
                    </div>
                    <span className="toolbar-title"> Advanced Search </span>
                </div>
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
