import React, { useContext } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, FormFeedback } from 'reactstrap';

import { AuthContext } from '../../Context/auth.context';

const LoginController = ( props ) => {
    const context = useContext( AuthContext );

    const validEmail = context.checkError ? context.checkError.email : false;
    const validPassword = context.checkError ? context.checkError.password : false;
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className={ "text-primary text-center" }>Login Page</h2>
                    <Form onSubmit={ context.addNewAuth( {
                        email : props.email,
                        password : props.password
                    } ) }>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="email" className="mr-sm-2">Email</Label>
                            <Input invalid={ validEmail } type="email" value={ props.email }
                                   onChange={ props.onChange } name="email"
                                   id="email" placeholder="something@idk.cool"/>
                            <FormFeedback>{ validEmail }</FormFeedback>
                        </FormGroup>
                        <FormGroup className="mb-2 mt-3 mr-sm-2 mb-sm-0">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input invalid={ validPassword } type="password" value={ props.password }
                                   onChange={ props.onChange } name="password"
                                   id="password" placeholder="don't tell!"/>
                            <FormFeedback>{ validPassword }</FormFeedback>
                        </FormGroup>
                        <div className={ "text-center" }>
                            <Button
                                className={ "mt-4" }>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginController;