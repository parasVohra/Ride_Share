import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
   Container

} from 'reactstrap';

import Logout from './auth/Logout'
import Login from './auth/Login'

class AppNavbar extends Component {
   

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return(
            <div>
                <Navbar color="dark" expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Ryyd</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/components/signin">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                </NavItem>
                                <NavItem>
                                   <Logout />
                                </NavItem>
                                <NavItem>
                                   <Login />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
             </div>
        );
       
    }
    
}

export default AppNavbar;