import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';
import { replace } from 'react-router-redux';
import URLBuilder from '../helpers/URLBuilder.js';
import ScrollArea from 'react-scrollbar';

/**
 * The list of filters that are clickable
 *
 * @extends {React.Component}
 */
export class FilterOptions extends React.Component {
    /**
     * Constructor for FilterOptions component. Initializes state and bind eventlisteners.
     * Fetches image list on construction
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);
        this.state = {
            filterOptions: {
                type: props.queryParams.type ? props.queryParams.type.split(",") : [],
                crawl_date__year: [],
                pub_date__year: [],
                domain: props.queryParams.domain ? props.queryParams.domain.split(",") : [],
            }
        };

        this.filterClick = this.filterClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
    }

    /**
     * Onclick handler for when filter is clicked
     * Changes icon to green then calls buildQueryParams to build the link
     * @param {object} event passed from click handler
     */
    filterClick(e) {
        e.preventDefault();
        let new_state = Object.assign({}, this.state.filterOptions)
        // Toggle checked class
        // Filter already clicked on
        if (e.target.tagName === "I") {
            e.target = e.target.parentNode;
        }

        const key = e.target.parentNode.parentNode.getAttribute("data-property")

        if (e.target.getElementsByTagName("i")[0].classList.contains("selected")) {
            e.target.getElementsByTagName("i")[0].className = "fa fa-check-circle-o";

            _.remove(new_state[key], (item) => item === e.target.parentNode.getAttribute("data-key"));
            this.setState({
                filterOptions: new_state
            });

        // Filter has not yet been selected
        } else {
            e.target.getElementsByTagName("i")[0].className += " " + "selected";
            // Really convulated way to push the selected filter into the array
            // Some reason Array.push() is setting this.state.filterOptions to 
            // 1 instead of pushing onto the existing array
            new_state[key] = _.concat(new_state[key], e.target.parentNode.getAttribute("data-key"));
            this.setState({
                filterOptions: new_state
            });
        }
        this.buildQueryParams(new_state);
    }

    /**
     * Builds the object from the list of filters created then pushes to new location
     * 
     * @param {query} object made up of filters
     */
    buildQueryParams(query) {
        console.log("query", query);
        let newquery = {};
        const filterParams =  _.reduce(query, (newquery, value, key) => {
            if (value.length > 0) {
                newquery[key] = value.join();
            } else {
                newquery[key] = [];
            }
            return newquery;
        }, {});

        const url = _.merge({}, _.omit(this.props.queryParams, ['page']), filterParams);
        console.log(URLBuilder(url));
        this.props.dispatch(push(this.props.location + URLBuilder(url)));
    }

    /**
     * Builds the list of collections retrieved from the API request
     * 
     * @param {object} list of filters 
     * @param {string} name of the property of the filter used for the queryparam
     */
    generateFilterList(filters, property) {
        let listItems = filters.map((item) => {
            let classname = "fa fa-plus-square-o";
            const param = this.props.queryParams[property] ? this.props.queryParams[property].split(',') : [];

            if (param.length !== 0 && _.includes(param, item)) {
                classname = "fa fa-plus-square selected";
            }

            return (<li data-key={item} key={item} id={item}>
                <a href={"#"} onClick={this.filterClick}>
                    <i className={classname} aria-hidden="true" />
                    {item}
                </a>
            </li>)
        });

        return (
            <ul className="filter-list" data-property={property}>
                {listItems}
            </ul>
        );
    }

    clearClick(e) {
        e.preventDefault();
        let newquery = Object.assign(this.state.filterOptions);
        newquery.domain=[];
        this.buildQueryParams(newquery);
    }

    /**
     * render method rendering the list
     * 
     */
    render() {
        return (
            <div className="filter-box">
                <div className="filter-header">
                    Filters
                </div>
                <div className="filters">
                    <div className="type-filter">
                        Categories
                        {this.generateFilterList(this.props.typeFilters, "type")}
                    </div>
                    {/*}<div className="crawl-date-filter">
                        Crawl Dates
                        {this.generateFilterList(this.props.yearFilters, "crawl_date__year")}
                    </div>
                    <div className="pub-year-filter">
                        Publish Dates
                        {this.generateFilterList(this.props.pubYearFilters, "pub_date__year")}
                    </div>*/}
                    <div className="domain-filter">
                        <div className="domain-filter-title">
                            <span>Domain</span> 
                            <a href="#" onClick={this.clearClick} className="clear-date-button">clear</a>
                        </div>
                        <ScrollArea
                            speed={0.8}
                            className="domain-scroller"
                            horizontal={false}
                            >
                        {this.generateFilterList(this.props.domainFilters, "domain")}
                        </ScrollArea>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Mapping props from state received from store
 */
function mapStateToProps(state) {
    return {
        typeFilters: state.docs.filterOptions ? state.docs.filterOptions[0] : [],
        domainFilters: state.docs.filterOptions ? state.docs.filterOptions[1] : [],
        yearFilters: state.docs.filterOptions ? state.docs.filterOptions[2] : [],
        pubYearFilters: state.docs.filterOptions ? state.docs.filterOptions[3] : [],
        location: state.routing.locationBeforeTransitions.pathname,
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(FilterOptions);
