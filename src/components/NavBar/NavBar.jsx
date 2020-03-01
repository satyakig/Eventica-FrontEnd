import React from 'react';
import { Navbar, DropdownButton, Dropdown, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = () => {
  // TODO: Get logged in status from user authentication PR
  const loggedIn = false;

  function profileButton() {
    if (loggedIn) {
      return (
        <DropdownButton
          variant="outline-primary"
          alignRight
          title="Profile"
          id="dropdown-menu-align-right"
          className=" mt-2 mt-sm-0"
        >
          <Dropdown.Item eventKey="1">Manage Events</Dropdown.Item>
          <Dropdown.Item eventKey="2">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3">Log Out</Dropdown.Item>
        </DropdownButton>
      );
    } else {
      return (
        <Button variant="outline-primary" type="login" show={loggedIn} className=" mt-2 mt-sm-0">
          Login
        </Button>
      );
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>LOGO PLACEHOLDER</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Form inline className="mt-2 mt-sm-0">
          <FormControl type="text" placeholder="Search" />
        </Form>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-primary" type="create-event" className=" mr-2 mt-2 mt-sm-0">
          Create Event
        </Button>
        {profileButton()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
