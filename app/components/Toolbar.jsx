import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Select from 'react-select';
import _ from 'lodash';
import DateField from './DateField.jsx';
import URLBuilder from '../helpers/URLBuilder.js';

/**
 * Toolbar component responsible for the subnav for advanced search
 *
 * @extends {React.Component}
 */
export class Toolbar extends React.Component {
    /**
     * Constructor for Toolbar component. Initializes state and bind eventlisteners.
     *
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);
        this.state = {
            category: ""
        }

        this.props.dispatch({type: 'collectionFetchList'});

        this.handleSelect = this.handleSelect.bind(this);
    }

    /**
     * Select handler
     *
     * @param {object} the item clicked on from the dropdown
     */
    handleSelect(value) {
        this.setState({category: value.value});
        this.setQueryParams(value.label);
    }

    /**
     * Creates list of collections
     *
     */
    createCollectionList() {
        let options = [];
        if (this.props.collections.results) {
            this.props.collections.results.map(({name}, i) => {
                options.push({
                    value: i,
                    label: name
                });
            });
        }
        return options;
    }

   /**
     * Creates and pushes the location given the category selected
     * @param {string} the category name selected
     */
   setQueryParams(category) {
        let newquery = {};
        newquery["collection"] = category || "";
        const url = _.merge({}, _.omit(this.props.queryParams, ['page']), newquery);
        this.props.dispatch(push(this.props.path.pathname + URLBuilder(url)));
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
                            placeholder="Categories"
                            value={this.state.category}
                            options={this.createCollectionList()}
                            onChange={this.handleSelect}
                        />                    
                    </div>
                    <div className="publish-date-selector"> 
                        Publish Date 
                        <div className="date-inputs-container">
                            <DateField placeholder="From" param="pub_start_date"/>
                            <DateField placeholder="To" param="pub_end_date"/>
                        </div>
                    </div>
                    <div className="crawl-date-selector"> 
                        Crawl Date 
                        <div className="date-inputs-container">
                            <DateField placeholder="From" param="crawl_start_date"/>
                            <DateField placeholder="To" param="crawl_end_date"/>
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
        collections: state.collections || [],
        queryParams: state.routing.locationBeforeTransitions.query || '',
        path: state.routing.locationBeforeTransitions || ''
    };
}
export default connect(mapStateToProps)(Toolbar);
