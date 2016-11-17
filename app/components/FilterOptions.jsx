import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';

const TYPE_CHOICES = ["HTML", "PDF", "OTHER"]
const DOMAINS = ["web.ca, ca.ca, .com"]
export class FilterOptions extends React.Component {
    /**
     * Constructor for FilterOptions component. Initializes state and bind eventlisteners.
     * Fetches image list on construction
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);
        console.log("FILTER OPTIONS", props.queryParams);
        this.state = {
            filterOptions: {
                type: []
            }
        };

        this.filterClick = this.filterClick.bind(this)
    }

    buildQueryParams(query) {
        _.reduce(query, (result, value, key) => {
            
            result += `?${key}=${value.type.join()}`
        }, "");
    }

    filterClick(e) {
        e.preventDefault();
        // this.props.dispatch(push("/search/hi"));

        // Toggle checked class
        if (e.target.getElementsByTagName("i")[0].classList.contains("selected")) {
            e.target.getElementsByTagName("i")[0].className = "fa fa-check-circle";
            this.setState({
                type: _.remove(this.state.filterOptions.type, (item) => item === e.target.parentNode.getAttribute("data-key"))
            });
        } else {
            e.target.getElementsByTagName("i")[0].className += " " + "selected";
            this.setState({
                type: this.state.filterOptions.type.push(e.target.parentNode.getAttribute("data-key"))
            });
            console.log(this.buildQueryParams(this.state));
        }

        // TODO: Push new path(")
        // this.props.dispatch({type})
        console.log(e.target.getElementsByTagName("i")[0].className);
    }

    generateFilterList(filters) {
        let listItems = filters.map((item) => { 
            return (<li data-key={item} key={item}> 
                <a href={"#"} onClick={this.filterClick}> 
                    <i className="fa fa-check-circle" aria-hidden="true" />
                    {item} 
                </a> 
            </li>)
        });

        return (
            <ul className="filter-list">
                {listItems}
            </ul>
        );
    }

    /**
     * render method rendering Images
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
                        {this.generateFilterList(this.props.typeFilters)}
                    </div>
                    <div className="domain-filter">
                    </div>
                    <div className="year-filter">
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
    console.log("Filter state", state);
    return {
        typeFilters: ["HTML", "PDF", "OTHER"],
        domainFilters: ["web.ca, ca.ca, .com"],
        yearFilters: ["1991, 1992, 2016"],
        location: state.routing.locationBeforeTransitions.pathname,
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(FilterOptions);
