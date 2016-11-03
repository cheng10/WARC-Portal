import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DocumentList from '../components/DocumentList.jsx';

export class Home extends React.Component {


    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }


    onClick(e) {
        e.preventDefault();
        console.log("hello");
        this.props.dispatch(push('/search'))
    }

    render() {
        return (
            <div className="page-home">
                <div className="subnav">
                    <ul className="links">
                        <li className="link selected" data-id="photos">
                            <a href="" onClick={this.onClick}>
                                <div className="title">Archives</div>
                            </a>
                        </li>
                        <li className="link" data-id="people">
                            <a href="" data-rapid_p="26">
                                <div className="title">Images</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="page-main">
                    <div className="doc-list-view">
                        <DocumentList />
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
export default connect(mapStateToProps)(Home);
