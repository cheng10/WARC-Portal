import React from 'react';
import { FormGroup, Col, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

export default class UserEditDrink extends React.Component
{
    static get propTypes()
    {
        return {
            input: React.PropTypes.object,
        };
    }

    render()
    {
        return(
            <FormGroup>
                <Col sm={2}>Job</Col>
                <Col sm={8}>
                    <InputGroup>
                        <FormControl {...this.props.input} id="drink" type="text" placeholder="Drink"/>
                        <InputGroup.Addon>
                            <Glyphicon glyph="briefcase"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </Col>
            </FormGroup>
        );
    }
}