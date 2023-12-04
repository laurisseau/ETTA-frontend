'use client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ForgotPassword = ({ user }) => {
  const [email, setEmail] = useState('');

  const sendStudentEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/user/forgotPassword', {
        email,
      });
      if (data) {
        window.location.href = '/studentResetPassword';
      }
    } catch (err) {
      //console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  const sendEducatorEmail = (e) => {
    e.preventDefault();
    console.log('Im an educator');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <Form
        style={{ width: '350px' }}
        onSubmit={user == 'student' ? sendStudentEmail : sendEducatorEmail}
      >
        <h5 className="mb-3">Enter your email:</h5>
        <Form.Group className="mb-4" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            className="address-form-height"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
          Send email
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
