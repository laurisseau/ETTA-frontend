'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const isCookieExpired = (userCookie) => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const checkExpiration = () => {
      if (userCookie) {
        try {
          const expirationDate = userCookie.expirationDate;
          const currentDate = new Date();
          const currentIsoTimestamp = currentDate.toISOString();

          if (expirationDate <= currentIsoTimestamp) {
            console.log('Cookie has expired');
            setModalShow(true);
          } else {
            console.log('Cookie is still valid');
            setModalShow(false);
          }
        } catch (error) {
          console.error('Invalid JSON format for userCookie');
        }
      }
    };

    checkExpiration();
  }, [userCookie]);

  return <ExpiredModal show={modalShow} onHide={() => setModalShow(false)} />;
};

const ExpiredModal = ({ show, onHide }) => {
  const signoutHandler = () => {
    Cookies.remove('user');
    Cookies.remove('educator');
    Cookies.remove('admin');
    onHide();
    window.location = '/loginOption';
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Body className="m-3">
        <div className="text-center">
          <h4 className="mb-3">
            Your session has expired. Please login again.
          </h4>
          <Button onClick={signoutHandler}>Login</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default isCookieExpired;
