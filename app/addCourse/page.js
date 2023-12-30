'use client';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavbar from '@/components/AdminNavbar';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const addCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseLanguage, setCourseLanguage] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const courseSlug = courseName.replace(/\s+/g, '-');
  const [courseSubscription, setCourseSubscription] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(
      'courseName',
      courseName,
      'courseSlug',
      courseSlug,
      'courseSubscription',
      courseSubscription,
      'courseLanguage',
      courseLanguage,
      'courseDescription',
      courseDesc
    );

    /*
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/user/login`, {
           
          });
 
        } catch (err) {
          console.log(err.response.data);
          //toast.error(err.response.data);
        }
        */
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <div
          className="d-flex justify-content-center"
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className="w-75 mt-5 ">
            <div className="">
              <h5 className="mb-3">Add a course</h5>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4" controlId="courseName">
                <Form.Control
                  placeholder="Enter the name of the course"
                  className="address-form-height"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="courseDesc">
                <Form.Select
                  aria-label="Default select example"
                  value={courseSubscription}
                  onChange={(e) => setCourseSubscription(e.target.value)}
                >
                  <option>Select the courses subscription</option>
                  <option value="Basic">Basic</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Premium">Premium</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4" controlId="courseLanguage">
                <Form.Select
                  aria-label="Default select example"
                  value={courseLanguage}
                  onChange={(e) => setCourseLanguage(e.target.value)}
                >
                  <option>Select the courses language</option>
                  <option value="Python">Python</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Java">Java</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4" controlId="courseDesc">
                <Form.Control
                  as="textarea"
                  placeholder="Describe the course your adding (252 character limit)"
                  className="address-textarea-height"
                  value={courseDesc}
                  onChange={(e) => {
                    if (e.target.value.length <= 252) {
                      setCourseDesc(e.target.value);
                    }
                  }}
                />
              </Form.Group>

              <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
                Add Course
              </Button>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default addCourse;
