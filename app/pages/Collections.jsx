import React from 'react';
import { connect } from 'react-redux';

/**
 * Not found page component
 */
class Collections extends React.Component {
    constructor(props) {
        super(props);
        console.log("COLLECTIONSSS");

        // Fetching list by calling collectionfetchlist in /sagas/collections
        this.props.dispatch({type: 'collectionFetchList'});
    }

    render() {
        console.log(this.props.collections);
        let collectionName = "hello world";
        if (this.props.collections.results) {
            collectionName = this.props.collections.results[0].name;
        }
        return(
            <div className="app-body">
                <h4>Collections page</h4>
                {collectionName}
            </div>
        );
    }
}

/**
 * Mapping props from state received from store. Turns state.collections in this.props.collections
 * to be used in the component
 */
function mapStateToProps(state) {
    console.log("Collections state", state);
    return {
        collections: state.collections || []
    };
}

// Connecting component to the store
export default connect(mapStateToProps)(Collections);
