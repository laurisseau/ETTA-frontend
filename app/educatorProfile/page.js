'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const educatorProfile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [educatorId, setEducatorId] = useState('');
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const userInfoString = Cookies.get('educator');
    if (!userInfoString) {
      window.location.href = '/';
    }
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setEducatorId(userInfo.sub);
    }
    const getCourseByEducatorId = async () => {
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);

          const { data } = await axios.get(
            `/api/educator/getCourseByEducatorId/${userInfo.sub}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setCourse(data.courseId);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    const getUserInfo = () => {
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
    getCourseByEducatorId();
    getUserInfo();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/educator/updateProfile',
        {
          email,
          username,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (data) {
        const updatedUserInfo = {
          ...JSON.parse(Cookies.get('educator')),
          email,
          username,
        };
        Cookies.set('educator', JSON.stringify(updatedUserInfo));
        toast.success('Profile updated');
      }
    } catch (err) {
      //console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  const deleteClass = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `/api/educator/deleteCourse/${educatorId}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setCourse(null);
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
        <h1 className="mb-4">Educator Profile</h1>
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
        {course != null ? (
          <Button
            onClick={deleteClass}
            className="mb-4 w-100 auth-btns"
            size="lg"
          >
            Delete class
          </Button>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default educatorProfile;
