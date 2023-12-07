'use client';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = ({ user }) => {
  const [email, setEmail] = useState('');
  const [resetConfirmationCode, setResetConfirmationCode] = useState('');
  const [resetPassword, setResetPassword] = useState('');

  const resetStudentPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/user/resetPassword', {
        email,
        resetConfirmationCode,
        resetPassword,
      });
      if (data) {
        toast.success('Password changed');
      }
    } catch (err) {
      //console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  const resetEducatorPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/educator/resetPassword', {
        email,
        resetConfirmationCode,
        resetPassword,
      });
      if (data) {
        toast.success('Password changed');
      }
    } catch (err) {
      //console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <Form
        style={{ width: '350px' }}
        onSubmit={
          user == 'student' ? resetStudentPassword : resetEducatorPassword
        }
      >
        <h5 className="mb-3">Reset your password:</h5>
        <Form.Group className="mb-4" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            className="address-form-height"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="resetConfirmationCode">
          <Form.Control
            type="resetConfirmationCode"
            placeholder="Enter your confirmation code"
            className="address-form-height"
            value={resetConfirmationCode}
            onChange={(e) => setResetConfirmationCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="resetPassword">
          <Form.Control
            type="password"
            placeholder="Enter your password"
            className="address-form-height"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
          Reset password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
