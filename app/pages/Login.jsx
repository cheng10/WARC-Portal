import React from 'react';
import {connect} from 'react-redux';
import { Modal, Button, FormGroup, FormControl, InputGroup, Col, PageHeader, Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

export class Login extends React.Component {
    constructor(props)
    {
        super(props);
        this.formSubmit = this.formSubmit.bind(this);
    }

    render() {
        console.log("redner", this.state);
        return (
            <div className= "login-content">
                <div className="auth-form">
                    <span className="admin"> <a href="http://warc.tech:8000/admin"> Admin </a> </span>
                    <PageHeader className="text-center"> Log In </PageHeader>
                    <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit)}>
                        <Col smOffset={2} sm={10}>
                            <Field name="username" component={AuthorLoginName} />
                        </Col>
                        <Col smOffset={2} sm={10}>
                        <Field name="password" component={AuthorLoginPass} />
                        </Col>
                        <FormGroup className="button-center">
                            <Button bsStyle="primary" type="submit"> Log in </Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }

    formSubmit(form) {
        console.log(form);
        this.props.dispatch({
            type: "authLogin",
            username: form.username,
            password: form.password
        });
    }
}

class AuthorLoginName extends React.Component {
    render() {
        return (
            <FormGroup>
                <Col sm={2}>Username</Col>
                <InputGroup>
                    <FormControl {...this.props.input} id="username" type="text" required={true}/>
                </InputGroup>
            </FormGroup>
        );
    }
}

class AuthorLoginPass extends React.Component {
    render() {
        return (
            <FormGroup>
                <Col sm={2}>Password</Col>
                    <InputGroup>
                        <FormControl {...this.props.input} id="password" type="password" required={true} placeholder="password"/>
                    </InputGroup>
            </FormGroup>
        )
    }
}

const validate = (values) => {
    const errors = {};
    return errors;
}

const LoginForm = reduxForm({
    form: 'login',
    validate: validate
})(Login);

// export the connected class
function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps)(LoginForm);
