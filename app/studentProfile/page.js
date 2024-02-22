'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getError } from '../utils';

const studentProfile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [enrolled, setEnrolled] = useState(null);
  const [studentFirstname, setStudentFirstname] = useState('');
  const [studentLastname, setStudentLastname] = useState('');
  const [parentFirstname, setParentFirstname] = useState('');
  const [parentLastname, setParentLastname] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [parentEmailAddress, setParentEmailAddress] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [age, setAge] = useState('');

  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setParentPhoneNumber(inputValue.slice(0, 10)); // Limit input to 10 characters
  };

  const handleAge = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setAge(inputValue.slice(0, 2)); // Limit input to 2 characters
  };

  useEffect(() => {
    const userInfoString = Cookies.get('user');
    const getUserInfo = () => {
      if (!userInfoString) {
        window.location.href = '/';
      }
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);
          console.log(userInfo);
          setEmail(userInfo.email);
          setUsername(userInfo.username);
          setAccessToken(userInfo.accessToken);
          setUserId(userInfo.sub);
          setStudentFirstname(userInfo.studentFirstname);
          setStudentLastname(userInfo.studentLastname);
          setParentFirstname(userInfo.parentFirstname);
          setParentLastname(userInfo.parentLastname);
          setParentPhoneNumber(userInfo.parentPhoneNumber);
          setParentEmailAddress(userInfo.parentEmailAddress);
          setSchool(userInfo.school);
          setGrade(userInfo.grade);
          setAge(userInfo.age);
        } catch (err) {
          toast.error('Error parsing user info');
        }
      }
    };

    const isEnrolled = async () => {
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);

          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/ifEnrolled/${userInfo.sub}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setEnrolled(data);
          }
        } catch (err) {
          toast.error(getError(err));
        }
      }
    };

    isEnrolled();
    getUserInfo();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/updateProfile`,
        {
          email,
          username,
          studentFirstname,
          studentLastname,
          parentFirstname,
          parentLastname,
          parentPhoneNumber,
          parentEmailAddress,
          school,
          grade,
          age,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (data) {
        const updatedUserInfo = {
          ...JSON.parse(Cookies.get('user')),
          email,
          username,
          studentFirstname,
          studentLastname,
          parentFirstname,
          parentLastname,
          parentPhoneNumber,
          parentEmailAddress,
          school,
          grade,
          age,
        };
        Cookies.set('user', JSON.stringify(updatedUserInfo));
        toast.success('Profile updated');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const leaveClass = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/deleteEnrolled/${userId}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setEnrolled(null);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
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

        <Form.Group className="mb-4" controlId="studentFirstname">
          <Form.Control
            type="username"
            placeholder="Enter the students firstname"
            className="address-form-height"
            value={studentFirstname}
            onChange={(e) => setStudentFirstname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="studentLastname">
          <Form.Control
            type="username"
            placeholder="Enter the students lastname"
            className="address-form-height"
            value={studentLastname}
            onChange={(e) => setStudentLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="parentFirstname">
          <Form.Control
            type="username"
            placeholder="Enter the parents firstname"
            className="address-form-height"
            value={parentFirstname}
            onChange={(e) => setParentFirstname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="parentLastname">
          <Form.Control
            type="username"
            placeholder="Enter the parents lastname"
            className="address-form-height"
            value={parentLastname}
            onChange={(e) => setParentLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="parentPhoneNumber">
          <Form.Control
            type="phoneNumber"
            placeholder="Enter the parents phone number"
            className="address-form-height"
            value={parentPhoneNumber}
            onChange={handlePhoneNumber}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="parentEmailAddress">
          <Form.Control
            type="email"
            placeholder="Enter the parents email address"
            className="address-form-height"
            value={parentEmailAddress}
            onChange={(e) => setParentEmailAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="school">
          <Form.Control
            type="school"
            placeholder="Enter the school you attend"
            className="address-form-height"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="grade">
          <Form.Select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          >
            <option>Select your grade</option>
            <option value="Ninth-grader">Ninth-grader</option>
            <option value="Tenth-grader">Tenth-grader</option>
            <option value="Eleventh-grader">Eleventh-grader</option>
            <option value="Twelfth-grader">Twelfth-grader</option>
            <option value="First-year">First-year student</option>
            <option value="Second-year">Second-year student</option>
            <option value="Third-year">Third-year student</option>
            <option value="Fourth-year">Fourth-year student</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" controlId="age">
          <Form.Control
            type="age"
            placeholder="Enter your age"
            className="address-form-height"
            value={age}
            onChange={handleAge}
          />
        </Form.Group>

        <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
          Update profile
        </Button>
        {enrolled != null ? (
          <Button
            onClick={leaveClass}
            className="mb-4 w-100 auth-btns"
            size="lg"
          >
            Leave class
          </Button>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default studentProfile;
