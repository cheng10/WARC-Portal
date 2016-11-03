import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DocumentList from '../components/DocumentList.jsx';

export class Images extends React.Component {


    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }


    onClick(e) {
        e.preventDefault();
        console.log("hello");
        this.props.dispatch(push('/search'));
    }

    render() {
        return (
            <div className="page-home">
                <div className="page-main">
                    <div className="doc-list-view">
                        I'm a picture yay'ayaya
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.docs.loading,
    };
}
export default connect(mapStateToProps)(Images);
