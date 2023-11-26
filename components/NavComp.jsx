'use client';
import Link from 'next/link';
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';

const NavComp = () => {
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
                  <NavDropdown.Item href="#chat-room">
                    Chat room
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Pricing" id="pricingDropdown">
                  <NavDropdown.Item href="#students">Students</NavDropdown.Item>
                  <NavDropdown.Item href="#students">Parents</NavDropdown.Item>
                  <NavDropdown.Item href="#Schools">
                    Schools
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>

        <div className="me-4">
          <Link href="/login" className="nav-button-not-active me-1">
            Log in
          </Link>
          <Link href="/signup" className="nav-button-active">
            Sign up
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavComp;
