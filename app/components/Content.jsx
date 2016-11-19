import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';

import Menu from './Menu.jsx';
import Toolbar from './Toolbar.jsx';

/**
 * Root component that is rendered
 *
 * App
 * @extends {React.Component}
 */
class Content extends React.Component {
    /**
     * Constructor for app component. Initializes state and bind eventlisteners.
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);

        this.state = {
            tab: _.trim(props.location.pathname, "/")
        }

        this.onClick = this.onClick.bind(this);
    }

    /**
     * click event for switching between tabs
     * @param {object} e event from clicklistener
     */
    onClick(e) {
        e.preventDefault();
        if (e.target.textContent === 'Images') {
            this.props.dispatch(push('/images'))
            this.setState({tab: "images"});
        } else if (e.target.textContent === 'Archives'){
            this.props.dispatch(push('/search'))
            this.setState({tab: "search"});
        } else {
          this.props.dispatch(push('/collections'))
          this.setState({tab: "collections"});
        }
    }

    /**
     * render method rendering App
     *
     */
    render() {
        return (
            <div className="app-content">
                <div className="subnav">
                    <ul className="links">
                        <li className={this.state.tab === "search" ? "link selected": "link"} data-id="photos">
                            <a href="" onClick={this.onClick}>
                                <div className="title">Archives</div>
                            </a>
                        </li>
                        <li className={this.state.tab === "images" ? "link selected": "link"} data-id="people">
                            <a href="" onClick={this.onClick}>
                                <div className="title">Images</div>
                            </a>
                        </li>
                        <li className={this.state.tab === "collections" ? "link selected": "link"} data-id="collections">
                            <a href="" onClick={this.onClick}>
                                <div className="title">Collections</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <Toolbar />
                <div className="app-body">
                    {this.props.children}
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
        loading: state.docs.loading,
    };
}
const hoc = (Component) => connect(mapStateToProps)(Component)

export default hoc(Content);
