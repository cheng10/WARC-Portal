import React from 'react';

import { Nav, NavItem, Glyphicon, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

export default class Menu extends React.Component {
    render() {
        return (
            <div className="header">
                <Navbar inverse fixedTop>
                    <Nav bsStyle="pills">
                        <NavItem className="nav-item">
                            <div className="header-logo"> WARC-Portal </div>
                        </NavItem>
                        <Nav>
                            <Navbar.Form pullLeft>
                                <FormGroup>
                                    <FormControl type="text" placeholder="Search">
                                    </FormControl>
                                </FormGroup>
                                {' '}
                                <Button type="submit">Submit</Button>
                            </Navbar.Form>
                        </Nav>
                    </Nav>
                    <Nav pullRight>
                        <NavItem className="nav-item float-right" eventKey={"logIn"}>
                            Log In
                            <Glyphicon glyph="log-in"/>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
