import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import './App.css';

import TopMenu from './NavBar/topMenu';
import { HomePageController } from './HomePage/homePageController';
import { LoginController } from './LoginPage/loginController';

import { AuthProvider } from './Context/auth.context';
import { AuthContext } from './Context/auth.context';

function App () {
    return (
        <AuthProvider>
            <Router>
                <TopMenu/>
                <AuthButton/>
                <Switch>
                    <PrivateRoute exact path="/">
                        <HomePageController/>
                    </PrivateRoute>
                    <PrivateRoute exact path="/books">
                        <HomePageController/>
                    </PrivateRoute>
                    <Route exact path="/login">
                        <LoginPage/>
                        <LoginController/>
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    );
}

const fakeAuth = {
    isAuthenticated : false,
    authenticate ( cb ) {
        setTimeout( cb, 100 ); // fake async
    },
    signout ( cb ) {
        fakeAuth.isAuthenticated = false;
        setTimeout( cb, 100 );
    }
};

function AuthButton () {

    const context = React.useContext( AuthContext );

    let history = useHistory();

    return ( fakeAuth.isAuthenticated ) ? (
        <p>
            Welcome!{ " " }
            <button
                onClick={ () => {
                    fakeAuth.signout( () => history.push( "/" ) );
                } }
            >
                { `log out` }
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

function PrivateRoute ( { children, ...rest } ) {
    const context = React.useContext( AuthContext );

    return (
        <Route
            { ...rest }
            render={ ( { location } ) =>
                context.checkAuth.length > 0 ? (
                    children
                ) : (
                    <Redirect
                        to={ {
                            pathname : "/login",
                            state : { from : location }
                        } }
                    />
                )
            }
        />
    );
}

function LoginPage () {
    const context = React.useContext( AuthContext );

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from : { pathname : "/" } };
    let login = () => {
        fakeAuth.authenticate( () => {
            fakeAuth.isAuthenticated = context.checkAuth.length > 0;
            history.replace( from );
        } );
    };

    return (
        context.checkAuth.length > 0 ?
            <div>
                <p>Click this button to view the page at { from.pathname }</p>
                <button onClick={ login }>Log in</button>
            </div>
            :
            ''
    );
}

export default App;
