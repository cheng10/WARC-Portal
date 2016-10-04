import React from 'react';

import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

export default class Menu extends React.Component
{
    render()
    {
        return(
            <Nav bsStyle="pills">
                <IndexLinkContainer to="/">
                    <NavItem>
                        Home
                    </NavItem>
                </IndexLinkContainer>
                <LinkContainer to="/user-edit">
                    <NavItem>
                        Add User <Glyphicon glyph="plus-sign"/>
                    </NavItem>
                </LinkContainer>
            </Nav>
        );
    }
}
