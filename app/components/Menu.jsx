import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { FormGroup, FormControl, Button, Glyphicon, InputGroup } from 'react-bootstrap';


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
    }

    // componentDidMount() {
    //     Spending too much time making it fancy, might come back later to create drop down menu
    //     const input = document.getElementsByClassName("form-control form-control-search-header-field")[0];
    //     const searchForm = document.getElementsByClassName("search-form")[0];
    //     const menu = document.createElement("div");
    //     console.log(searchForm, "searchForm");
    //     menu.className = "drop-down-header";
    //     input.addEventListener("keydown", () => {
    //         searchForm.appendChild(menu);
    //     })
    // }

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

   /**
     * render method rendering Menu
     * 
     */
    render() {
        return (
            <nav>
                <div className="navbar">
                    <span className="header-logo">
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
