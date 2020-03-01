import React, { Component } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export class AuthProvider extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            error : {},
            auth : []
        };

        this.addNewAuth = this.addNewAuth.bind( this );
    }

    addNewAuth ( info ) {
        return ( e ) => {
            console.log(info);
            e.preventDefault();
            axios( {
                method : 'post',
                url : 'http://192.168.1.9:8888/users/login',
                data : info
            } )
                .then( res => {
                    if ( res.data.error ) {
                        this.setState( state => {
                            return {
                                ...this.state,
                                error : res.data.error
                            }
                        } );
                        return
                    }

                    this.setState( state => {
                        return {
                            ...this.state,
                            auth : this.state.auth.concat( res.data.result )
                        }
                    } );

                } )
                .catch( err => {
                    console.log( err )
                } );
        };
    }

    render () {
        return <AuthContext.Provider value={
            {
                checkError : this.state.error,
                checkAuth : this.state.auth,
                addNewAuth : this.addNewAuth
            }
        }>
            { this.props.children }
        </AuthContext.Provider>
    }
}