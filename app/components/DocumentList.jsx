import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';
import DocElementList from './DocElementList.jsx';
import FilterOptions from './FilterOptions.jsx';
import URLBuilder from '../helpers/URLBuilder.js';

/**
 * Class that renders the list of documents
 * 
 * DocumentList
 * @extends {React.Component}
 */
class DocumentList extends React.Component
{
    /**
     * Constructor for DocumentList component. Initializes state and bind eventlisteners.
     * Sets current page of the document list and fetches them
     * @param {object} props passed down from parent
     */
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true
        }
        // when we don't have any users, update the state with the users list taken from the api
        if (0 === this.props.documents.length) {
            // console.log("here", this.props)
            this.props.dispatch({type: 'docsFetchList', query: this.props.queryParams});
        }

        // bind <this> to the event method
        this.changePage = this.changePage.bind(this);
        this.onChange = this.onChange.bind(this);
    }
   /**
     * Life cycle method of React that is called before receiving new props
     * 
     * @param {object} newprops passed down from parent to check if page needs to retrieve new data 
     */
    componentWillUpdate(newprops) {
        // console.log("willupdate", this.props, newprops);
        // console.log(_.isEqual(newprops.queryParams, this.props.queryParams));
        if (!_.isEqual(newprops.queryParams, this.props.queryParams)) {
            // console.log("updating");
            this.onChange();
            this.props.dispatch({type: 'docsFetchList', query: newprops.queryParams});
        }
    }

    /**
     * render method rendering App
     * 
     */
    render() {
        console.log("Render", this.props);
        // pagination
        const per_page = 10;
        const pages = Math.ceil(this.props.count / per_page);
        let start_count = 0;

        // render
        if (!this.props.loading) {
            // show the list of users
            return (
                <div className="page-main">
                    <div className="doc-list-view">
                        <FilterOptions />
                        <div className="doc-list">
                            <ListGroup>
                                {this.props.documents.map((document, index) => {
                                    start_count++;
                                    return (<DocElementList key={start_count} id={start_count} document={document}/>);

                                })}
                            </ListGroup>
                            <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10} first last next prev
                                boundaryLinks items={pages} activePage={this.props.page} onSelect={this.changePage}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            // show the loading state
            return (
                <ProgressBar active now={100}/>
            );
        }
    }

    /**
     * eventhandler to change the user lists' current page
     * @param {number} page number changing to
     */
    changePage(page) {
        console.log("changing page");
        let newquery = {page: page};
        let url = _.merge({}, this.props.queryParams, newquery);
        this.props.dispatch(push(this.props.path.pathname + URLBuilder(url)));
        this.onChange();
    }

    /**
     * eventhandler to change the user lists' current page
     * 
     */
    onChange() {
        this.props.dispatch({type: 'docs.onLoad'});
    }
}

/**
 * Mapping props from state received from store
 */
function mapStateToProps(state) {
    console.log('docstate', state);
    return {
        documents: state.docs.documents || [],
        count: state.docs.count || 0,
        loading: state.docs.loading && true,
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        queryParams: state.routing.locationBeforeTransitions.query || '',
        path: state.routing.locationBeforeTransitions || ''
    };
}

const hoc = (Component) => connect(mapStateToProps)(Component)

export default hoc(DocumentList);
