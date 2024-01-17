'use client';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userCookie = Cookies.get('user');
  const educatorCookie = Cookies.get('educator');

  if (userCookie || educatorCookie) {
    window.location.href = '/';
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user/login`,
        {
          username: email,
          password,
        }
      );
      if (data) {
        const expirationTime = 60; // in minutes
        const expirationDate = new Date();
        expirationDate.setTime(
          expirationDate.getTime() + expirationTime * 60 * 1000
        ); // convert minutes to milliseconds

        data['expirationDate'] = expirationDate;
        Cookies.set('user', JSON.stringify(data), { expires: 1 / 12 });
        window.location.href = '/';
      }
    } catch (err) {
      //console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <div style={{ width: '350px' }}>
          <div className="d-flex justify-content-center">
            <div className="">
              <h5 className="mb-3">Sign in as a student</h5>
            </div>
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="address-form-height"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
              Sign in
            </Button>

            <div className="text-center d-flex justify-content-between">
              <p>
                Not a member? <Link href="/studentSignup">Sign up</Link>
              </p>
              <Link href="/studentForgotPassword">Forgot password?</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default login;
