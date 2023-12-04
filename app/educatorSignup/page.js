'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';

const educatorSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      console.log('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/auth/educator/signup', {
        email,
        username,
        password,
      });
      if (data) {
        setOutputValue(data.output);
      }
    } catch (err) {
      console.log(err.response.data);
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
              <h5 className="mb-3">Sign up as an educator</h5>
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

            <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
              Sign up
            </Button>

            <div className="text-center">
              <p>
                Already a member? <Link href="/educatorLogin">Login</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default educatorSignup;
