import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';
import { replace } from 'react-router-redux';
import URLBuilder from '../helpers/URLBuilder.js';

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

        this.filterClick = this.filterClick.bind(this)
    }

    filterClick(e) {
        e.preventDefault();
        const key = e.target.parentNode.parentNode.getAttribute("data-property")
        // Toggle checked class
        if (e.target.getElementsByTagName("i")[0].classList.contains("selected")) {
            e.target.getElementsByTagName("i")[0].className = "fa fa-check-circle";
            this.setState({
                type: _.remove(this.state.filterOptions[key], (item) => item === e.target.parentNode.getAttribute("data-key"))
            });
        } else {
            e.target.getElementsByTagName("i")[0].className += " " + "selected";
            this.setState({
                type: this.state.filterOptions[key].push(e.target.parentNode.getAttribute("data-key"))
            });
        }
        this.props.dispatch(replace(`${this.props.location}${this.buildQueryParams(this.state.filterOptions)}`));
    }

    buildQueryParams(query) {
        let url = URLBuilder(_.pick(this.props.queryParams, ['search'])) || "?";
        return _.reduce(query, (url, value, key) => {
            if (value.length > 0) {
                url += `&${key}=${value.join()}`
            }
            return url;
        }, url);
    }

    generateFilterList(filters, property) {
        let listItems = filters.map((item) => {
            let classname = "fa fa-check-circle";
            const param = this.props.queryParams[property] ? this.props.queryParams[property].split(',') : [];

            if (param.length !== 0 && _.includes(param, item)) {
                classname = "fa fa-check-circle selected";
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

    /**
     * render method rendering Images
     *
     */
    render() {
        console.log("this state", this.state);
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
                        Domain
                        {this.generateFilterList(this.props.domainFilters, "domain")}
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
        typeFilters: state.docs.filterOptions ? state.docs.filterOptions[0] : [],
        domainFilters: state.docs.filterOptions ? state.docs.filterOptions[1] : [],
        yearFilters: state.docs.filterOptions ? state.docs.filterOptions[2] : [],
        pubYearFilters: state.docs.filterOptions ? state.docs.filterOptions[3] : [],
        location: state.routing.locationBeforeTransitions.pathname,
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(FilterOptions);
