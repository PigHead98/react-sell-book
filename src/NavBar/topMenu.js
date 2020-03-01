import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import { Link } from "react-router-dom";

const TopMenu = ( props ) => {
    const [ collapsed, setCollapsed ] = useState( true );

    const toggleNavbar = () => setCollapsed( !collapsed );

    return (
        <div>
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/" className="mr-auto">Sell Book</NavbarBrand>
                <NavbarToggler onClick={ toggleNavbar } className="mr-2"/>
                <Collapse isOpen={ !collapsed } navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className={"mx-2"}>
                            <Link to={ "/books" }>
                                Books
                            </Link>
                        </NavItem>
                        <NavItem className={"mx-2"}>
                            <Link to={ "/login" }>
                                Login
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default TopMenu;