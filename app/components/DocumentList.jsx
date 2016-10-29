import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';
import DocElementList from './DocElementList.jsx';

export class DocumentList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            loading: true
        }
        // when we don't have any users, update the state with the users list taken from the api
        if (0 === this.props.documents.length) {
            console.log("here", this.props)
            this.props.dispatch({type: 'docsFetchList', query: this.props.queryParams});
        }

        // bind <this> to the event method
        this.changePage = this.changePage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillUpdate(newprops) {
        console.log("willupdate", this.props, newprops);
        console.log(_.isEqual(newprops.queryParams, this.props.queryParams));
        if (!_.isEqual(newprops.queryParams, this.props.queryParams)) {
            console.log("updating");
            this.onChange();
            this.props.dispatch({type: 'docsFetchList', query: newprops.queryParams});
        }
    }

    render() {
        console.log("Render", this.props);
        // pagination
        const per_page = 10;
        const pages = Math.ceil(this.props.count / per_page);
        let start_count = 0;

        // render
        if (!this.props.loading) {
            // show the list of users
            return(
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
            );
        } else {
            // show the loading state
            return (
                <ProgressBar active now={100}/>
            );
        }
    }

    /**
     * Change the user lists' current page
     */
    changePage(page) {
        console.log("changing page");
        const search = this.props.queryParams.search;
        let url = search ? `/?search=${search}&page=${page}`: `/?page=${page}`;
        this.props.dispatch(push(url));
        this.onChange();
    }

    onChange() {
        this.props.dispatch({type: 'docs.onLoad'});
    }
}

// export the connected class
function mapStateToProps(state) {
    console.log('mapstate', state);
    return {
        documents: state.docs.documents || [],
        count: state.docs.count || 0,
        loading: state.docs.loading && true,
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(DocumentList);