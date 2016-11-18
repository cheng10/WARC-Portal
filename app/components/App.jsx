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
     * render method rendering App
     * 
     */
    render() {
        return (
            <div className="app-container">
                <div className="row">
                    <Menu/>
                </div>
                {this.props.children}
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
