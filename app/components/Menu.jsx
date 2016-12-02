import React from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'react-router-redux';
import { FormGroup, FormControl, Button, Glyphicon, InputGroup, ButtonToolbar, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';


/**
 * Menu class responsible for search the
 * top navbar containing search bar 
 * 
 * Menu
 * @extends {React.Component}
 */

export class Menu extends React.Component {
    /**
     * Constructor for Menu component. Initializes state and bind eventlisteners.
     * 
     */
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
        this.onVisSelect = this.onVisSelect.bind(this);
        this.onProSelect = this.onProSelect.bind(this);
        this.headerClick = this.headerClick.bind(this);
    }

   /**
     * click event for search bar
     * @param {object} e event from clicklistener
     */
    onClick(e) {
        e.preventDefault();
        const value = document.getElementsByClassName("form-control form-control-search-header-field")[0].value;
        console.log(this.props.location);
        this.props.dispatch(replace(`${this.props.location}?search=${value}`));
        return false;
    }

    onVisSelect(e) {
        if (e === "tfidf") {
            this.props.dispatch(push('/visualizations'));
        }
        if (e === "wordcloud") {
            this.props.dispatch(push('/wordcloud'));
        }
    }

    onProSelect(e) {
       if (e === "login") {
            this.props.dispatch(push('/login'));
        } else if (e === "collection") {
            this.props.dispatch(push('/collections'))
        } else if (e === "logout") {
            sessionStorage.clear();
            this.props.dispatch(push('/search'));
            window.location.reload();
        }
    }

    getProfileSelect() {
        if (sessionStorage.token) {
            return (
                <Dropdown.Menu className="">
                    <MenuItem eventKey="logout">Logout</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="collection">Collections</MenuItem>
                </Dropdown.Menu>
            )
        } else {
            return (
                <Dropdown.Menu className="">
                    <MenuItem eventKey="login">Login</MenuItem>
                </Dropdown.Menu>
            )
        }
    }

    headerClick() {
        this.props.dispatch(push('/search'));
    }

   /**
     * render method rendering Menu
     * 
     */
    render() {
        return (
            <nav>
                <div className="navbar">
                    <span className="header-logo" onClick={this.headerClick}>
                        WARC-Portal
                    </span>
                    <div className="search-form">
                        <form onSubmit={this.onClick}>
                            <FormGroup>
                                <InputGroup>
                                        <FormControl type="text" placeholder="Search" bsStyle="search-header-field"/>
                                    <InputGroup.Button>
                                        <Button type="submit" bsStyle="primary" onClick={this.onClick}><Glyphicon glyph="search" /></Button>
                                    </InputGroup.Button>
                                    </InputGroup>
                            </FormGroup>
                        </form>
                    </div>
                    <div className="header-links">
                        <ButtonToolbar className="analytics-button">
                            <Dropdown id="dropdown-custom-1" onSelect={this.onVisSelect}>
                                <Dropdown.Toggle bsStyle="default" title="primary" noCaret id="dropdown-no-caret">
                                    <i className="fa fa-bar-chart" aria-hidden="true"></i> Visualizations
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="">
                                    <MenuItem eventKey="tfidf">tf-idf</MenuItem>
                                    <MenuItem eventKey="wordcloud">Word Cloud</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                        <div className="profile-button">
                            <ButtonToolbar id="profile-button">
                                <Dropdown id="dropdown-custom-1" onSelect={this.onProSelect}>
                                    <Dropdown.Toggle bsStyle="default" title="primary" noCaret id="dropdown-no-caret">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </Dropdown.Toggle>
                                    {this.getProfileSelect()}
                                </Dropdown>
                            </ButtonToolbar>                    
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

/**
 * Mapping props from state received from store
 */
function mapStateToProps(state) {
    return {
        loading: state.docs.loading,
        location: state.routing.locationBeforeTransitions.pathname
    };
}
export default connect(mapStateToProps)(Menu);
