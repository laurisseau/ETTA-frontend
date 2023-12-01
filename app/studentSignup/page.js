'use client';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = () => {};
  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <div style={{ width: '350px' }}>
          <div className="d-flex justify-content-center">
            <div className="">
              <h5 className="mb-3">Sign up as a student</h5>
            </div>
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="username">
              <Form.Control
                type="username"
                placeholder="Enter your username"
                className="address-form-height"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="address-form-height"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                className="address-form-height"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
              Sign up
            </Button>

            <div className="text-center">
              <p>
                Already a member? <Link href="/studentLogin">Login</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default signup;
