'use client';
import Link from 'next/link';
import { NavDropdown } from 'react-bootstrap';
import { Context } from '../app/Provider';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faUserGroup,
  faFile,
  faUser,
  faChartLine,
  faChalkboardUser,
} from '@fortawesome/free-solid-svg-icons';
const NavComp = () => {
  const value = useContext(Context);

  const signoutHandler = () => {
    Cookies.remove('user');
    Cookies.remove('educator');
    Cookies.remove('admin');
    window.location.reload();
  };
  /

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark min-vh-100 d-flex justify-content-between flex-column ">
          <div>
            <Link
              href="/adminDashboard"
              className="text-decoration-none text-white d-flex align-items-center ms-3 mt-2"
            >
              <span className="ms-1 fs-4 d-none d-sm-inline">Brand</span>
            </Link>

            <hr className="text-secondary d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  href="/adminDashboard"
                  className="nav-link text-white fs-5 d-flex "
                >
                  <FontAwesomeIcon icon={faChartLine}/>
                  <span className="ms-3 d-none d-sm-inline">Dasboard</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  href="/adminLessons"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <FontAwesomeIcon icon={faChalkboardUser} />
                  <span className="ms-3 d-none d-sm-inline">Lessons</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  href="/lessonPages"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ms-3 d-none d-sm-inline">Lesson Pages</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  href="/users"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <FontAwesomeIcon icon={faUserGroup} />
                  <span className="ms-3 d-none d-sm-inline">Users</span>
                </Link>
              </li>
            </ul>
          </div>

          <NavDropdown
            title={
              <div style={{ display: 'inline-block' }}>
                <div className="d-flex align-items-center ">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  <span className="d-none d-sm-inline me-2">
                    {value.username}
                  </span>
                </div>
              </div>
            }
            id="basic-nav-dropdown"
            className="dropup text-decoration-none text-white p-3 fs-5"
          >
            <NavDropdown.Item href="/dashboard/profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={signoutHandler}>
              Signout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

export default NavComp;
