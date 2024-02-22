'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getError } from '../utils';

const signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const [studentFirstname, setStudentFirstname] = useState('');
  const [studentLastname, setStudentLastname] = useState('');
  const [parentFirstname, setParentFirstname] = useState('');
  const [parentLastname, setParentLastname] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [parentEmailAddress, setParentEmailAddress] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [age, setAge] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  const passwordArr = password.split('');
  const upperCaseArr = password.toUpperCase().split('');
  const lowerCaseArr = password.toLowerCase().split('');

  const filterLower = (lowerCaseArr) => {
    return lowerCaseArr.filter((char) => /[a-zA-Z]/.test(char));
  };

  const filterUpper = (upperCaseArr) => {
    return upperCaseArr.filter((char) => /[a-zA-Z]/.test(char));
  };

  const upperCaseArrResult = filterUpper(upperCaseArr);
  const lowerCaseArrResult = filterLower(lowerCaseArr);

  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setParentPhoneNumber(inputValue.slice(0, 10)); // Limit input to 10 characters
  };

  const handleAge = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setAge(inputValue.slice(0, 2)); // Limit input to 2 characters
  };

  const [numVerification, setNumVerification] = useState('');
  const [findSpecialCharacters, setFindSpecialCharacters] = useState('');
  const [findUpperCase, setFindUpperCase] = useState('');
  const [findLowerCase, setFindLowerCase] = useState('');
  const [numOfCharacters, setNumOfCharacters] = useState('');

  useEffect(() => {
    const integerArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialCharacters = '~!@#$%^&*()_-+=[{]}|\\:;<>,.?/\'"';
    const specialCharactersArr = specialCharacters.split('');

    const findIntegers = passwordArr.find((e) => integerArr.includes(e));
    const findSpecialCharacters = passwordArr.find((e) =>
      specialCharactersArr.includes(e)
    );
    const findUpperCaseCharcters = passwordArr.find((e) =>
      upperCaseArrResult.includes(e)
    );

    const findLowerCaseCharcters = passwordArr.find((e) =>
      lowerCaseArrResult.includes(e)
    );

    const getClassBasedOnCondition = (condition) => {
      return condition ? 'text-success' : 'text-danger';
    };

    setNumVerification(getClassBasedOnCondition(findIntegers));
    setFindSpecialCharacters(getClassBasedOnCondition(findSpecialCharacters));
    setFindUpperCase(getClassBasedOnCondition(findUpperCaseCharcters));
    setFindLowerCase(getClassBasedOnCondition(findLowerCaseCharcters));
    setNumOfCharacters(getClassBasedOnCondition(password.length >= 8));
  }, [
    passwordArr,
    password,
    findUpperCase,
    upperCaseArr,
    lowerCaseArr,
    upperCaseArrResult,
    lowerCaseArrResult,
  ]);

  const userCookie = Cookies.get('user');
  const educatorCookie = Cookies.get('educator');

  if (userCookie || educatorCookie) {
    window.location.href = '/';
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user/signup`,
        {
          email,
          username,
          password,
          studentFirstname,
          studentLastname,
          parentFirstname,
          parentLastname,
          parentPhoneNumber,
          parentEmailAddress,
          school,
          grade,
          age,
        }
      );

      if (data) {
        toast.success('Verify your email to login.');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <div className="mt-5 d-flex justify-content-center">
        <div style={{ width: '350px' }}>
          <div className="d-flex justify-content-center">
            <div className="">
              <h5 className="mb-3">Sign up as a student</h5>
            </div>
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter the students email"
                className="address-form-height"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="username">
              <Form.Control
                type="username"
                placeholder="Enter the students username"
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

            <div className="mt-3 mb-3">
              <div className={numOfCharacters}>
                Password must be at least 8 characters long.
              </div>
              <div className={findUpperCase}>
                password must have an uppercase character.
              </div>
              <div className={findLowerCase}>
                password must have a lowercase character.
              </div>
              <div className={findSpecialCharacters}>
                Password must have special characters.
              </div>
              <div className={numVerification}>Password must have numbers.</div>
            </div>

            <p className="text-center">{signupSuccess}</p>

            <Button type="submit" className="mb-2 w-100 auth-btns" size="lg">
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
