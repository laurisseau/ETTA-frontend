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
  const authCookie = value.role;

  const signoutHandler = () => {
    Cookies.remove('user');
    Cookies.remove('educator');
    window.location = '/loginOption';
  };

  return (
    <>
      {authCookie != 'ADMIN' ? (
        <Navbar
          bg="dark"
          expand="md"
          data-bs-theme="dark"
          style={{ width: '104%' }}
        >
          <Container className="d-flex justify-content-between">
            <div className="d-none d-md-block">
              <Link href="/">
                {' '}
                <img
                  src="/images/logo.png"
                  style={{ height: '45px', width: '45px' }}
                  alt="Logo"
                />
              </Link>
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
                    <Nav.Link href="/">
                      <img
                        src="/images/logo.png"
                        style={{ height: '45px', width: '45px' }}
                        alt="Logo"
                      />
                    </Nav.Link>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="align-items-center me-auto">
                    <Nav.Link className="nav-link" href="/aboutUs">
                      About Us
                    </Nav.Link>
                    <Nav.Link
                      className="nav-link"
                      href={
                        authCookie == 'EDUCATOR'
                          ? '/educatorCourse'
                          : '/courses'
                      }
                    >
                      Courses
                    </Nav.Link>
                    <NavDropdown title="Community" id="communityDropdown">
                      <NavDropdown.Item
                        href="https://discord.com/"
                        target="_blank"
                      >
                        Discord
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="/pricing">Pricing</Nav.Link>

                    <Nav.Link href="https://donorbox.org/" target="_blank">
                      Donations
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </div>

            <div className="me-4">
              {authCookie ? (
                <>
                  <Link
                    href={
                      authCookie == 'USER'
                        ? '/studentProfile'
                        : '/educatorProfile'
                    }
                    className="nav-button-not-active me-1"
                  >
                    Profile
                  </Link>
                  <span onClick={signoutHandler} className="nav-button-active">
                    Sign out
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href="/loginOption"
                    className="nav-button-not-active me-1"
                  >
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
      ) : (
        <></>
      )}
    </>
  );
};

export default NavComp;
