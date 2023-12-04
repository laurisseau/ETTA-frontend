'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const studentProfile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getUserInfo = () => {
      const userInfoString = Cookies.get('user');
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);
          setEmail(userInfo.email);
          setUsername(userInfo.username);
          setAccessToken(userInfo.accessToken);
        } catch (error) {
          console.error('Error parsing user info JSON:', error);
        }
      }
    };

    getUserInfo();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/user/updateProfile',
        {
          email,
          username,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (data) {
        const updatedUserInfo = { ...JSON.parse(Cookies.get('user')), email, username };
        Cookies.set('user', JSON.stringify(updatedUserInfo));
        toast.success('Profile updated');
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
      <Form style={{ width: '350px' }} onSubmit={updateProfile}>
        <h1 className="mb-4">Student Profile</h1>
        <Form.Group className="mb-4" controlId="email">
          <Form.Control
            type="email"
            className="address-form-height"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="username">
          <Form.Control
            type="username"
            className="address-form-height"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
          Update profile
        </Button>
      </Form>
    </div>
  );
};

export default studentProfile;
