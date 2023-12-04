'use client';
import Link from 'next/link';
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import { Context } from '../app/Provider';
import { useContext } from 'react';
import Cookies from 'js-cookie';

const NavComp = () => {
  const value = useContext(Context);
  const authCookie = value;

  const signoutHandler = () => {
    Cookies.remove('user');
    Cookies.remove('educator');
    window.location.reload();
  };

  return (
    <Navbar
      bg="dark"
      expand="md"
      data-bs-theme="dark"
      style={{ width: '104%' }}
    >
      <Container className="d-flex justify-content-between">
        <div className="d-none d-md-block">
          <Navbar.Brand href="/">Icon</Navbar.Brand>
        </div>

        <div>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Icon
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="align-items-center me-auto">
                <Link className="nav-link" href="#courses" passHref>
                  Courses
                </Link>
                <NavDropdown title="Community" id="communityDropdown">
                  <NavDropdown.Item href="#discord">Discord</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Pricing" id="pricingDropdown">
                  <NavDropdown.Item href="#students">Students</NavDropdown.Item>
                  <NavDropdown.Item href="#students">Parents</NavDropdown.Item>
                  <NavDropdown.Item href="#Schools">Schools</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#donations">Donations</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>

        <div className="me-4">
          {authCookie ? (
            <>
              <Link href="/profile" className="nav-button-not-active me-1">
                Profile
              </Link>
              <span onClick={signoutHandler} className="nav-button-active">
                Sign out
              </span>
            </>
          ) : (
            <>
              <Link href="/loginOption" className="nav-button-not-active me-1">
                Log in
              </Link>
              <Link href="/signupOption" className="nav-button-active">
                Sign up
              </Link>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavComp;
