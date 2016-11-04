import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import _ from 'lodash';

import Menu from './Menu.jsx';

/**
 * Root component that is rendered
 * 
 * App
 * @extends {React.Component}
 */
class App extends React.Component {
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
        } else {
            this.props.dispatch(push('/search'))
            this.setState({tab: "search"});
        }
    }

    /**
     * render method rendering App
     * 
     */
    render() {
        return (
            <div className="app-container">
                <div className="row">
                    <Menu/>
                </div>
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
                    </ul>
                </div>
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

export default hoc(App);
