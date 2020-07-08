import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './index.styl'

const links = [
  { href: '/list', text: 'Listagem de Motoristas', key: 1 },
  { href: '/register', text: 'Cadastrar Motorista', key: 2 },
];

const createNavItem = ({ href, text, className, key }) => (
    <NavItem key={key}>
    <NavLink to={href} tag={Link} className={className}>
        {text}
    </NavLink>
  </NavItem>
);

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    return (
      <div>
        <Navbar id="menu" light expand="md">
          <NavbarBrand href="/">Motoristas Brasileiros</NavbarBrand>
          <NavbarToggler className="btn-menu" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map(createNavItem)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
