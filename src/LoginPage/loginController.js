import React, { Component } from "react";

import LoginView from './view/loginView';

export class LoginController extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            email : '',
            password : '',
            onChange : this.onChange()
        };

        this.onChange = this.onChange.bind( this );
    }

    onChange () {
        return ( e ) => {

            let key = e.target.name;
            let value = e.target.value;
            this.setState( state => {
                return {
                    ...this.state,
                    [key] : value
                }
            } );
        };
    }

    render () {
        return <LoginView { ...this.state }/>;
    }

}