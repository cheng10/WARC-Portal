import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { Field, reduxForm } from 'redux-form';
import { PageHeader, Form, FormGroup, Col, Button } from 'react-bootstrap';

import UserEditUsername from '../components/UserEditUsername.jsx';
import UserEditDrink from '../components/UserEditDrink.jsx';

export class UserEdit extends React.Component
{
    constructor(props)
    {
        super(props);

        // set the current form type
        this.form_type = (props.initialValues.id > 0) ? 'edit' : 'add';

        // bind <this> to the event method
        this.formSubmit = this.formSubmit.bind(this);
    }

    render()
    {
        return(
            <div className="page-user-edit">
                <PageHeader>{'edit' === this.form_type ? 'User edit' : 'User add'}</PageHeader>
                <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit)}>
                    <Field name="username" component={UserEditUsername}/>
                    <Field name="drink" component={UserEditDrink}/>
                    <FormGroup>
                        <Col smOffset={2} sm={8}>
                            <Button type="submit" disabled={this.props.invalid || this.props.submitting}>
                                Save User
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    formSubmit(values)
    {
        // add/edit the user in the api
        const upper_form_type = this.form_type.charAt(0).toUpperCase() + this.form_type.slice(1);
        this.props.dispatch({
            type: 'users' + upper_form_type,  // Add or Edit
            id: values.id,
            username: values.username,
            drink: values.drink
        });

        // add/edit the user in the state
        this.props.dispatch({
            type: 'users.' + this.form_type,  // add or edit
            id: values.id,
            username: values.username,
            drink: values.drink
        });
    }
}

// decorate the form component
const UserEditForm = reduxForm({
    form: 'user_edit',
    validate: function(values){
        const errors = {};
        if (!values.username) {
            errors.username = 'Username is required';
        }
        return errors;
    },
})(UserEdit);

// export the connected class
function mapStateToProps(state, own_props) {
    // set the form data
    let form_data = {
        id: 0,
        username: '',
        job: '',
    };
    for (const user of state.users.list) {
        if (user.id === Number(own_props.params.id)) {
            form_data = user;
            break;
        }
    }

    // pass the state values
    return {
        initialValues: form_data,
    };
}
export default connect(mapStateToProps)(UserEditForm);
