'use client';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavbar from '@/components/AdminNavbar';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const addPage = () => {
  const [pageNum, setPageNum] = useState(0); // <================= make dynamic
  const [courseHeader, setCourseHeader] = useState('');
  const [courseLesson, setCourseLesson] = useState('');
  const [courseInstructions, setCourseInstructions] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const handleEditorChange = (value, event) => {
    setEditorValue(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(
      'pageNum',
      pageNum,
      'courseHeader',
      courseHeader,
      'courseLesson',
      courseLesson,
      'courseInstructions',
      courseInstructions,
      'editorValue',
      editorValue
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
              <h5 className="mb-3">Add a page</h5>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4" controlId="courseHeader">
                <Form.Control
                  placeholder="Enter the header for this page"
                  className="address-form-height"
                  value={pageNum}
                  onChange={(e) => setPageNum(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="courseHeader">
                <Form.Control
                  placeholder="Enter the header for this page"
                  className="address-form-height"
                  value={courseHeader}
                  onChange={(e) => setCourseHeader(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="courseLesson">
                <Form.Control
                  as="textarea"
                  placeholder="Enter the lesson for this page"
                  value={courseLesson}
                  onChange={(e) => setCourseLesson(e.target.value)}
                  style={{ height: '300px' }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="courseLesson">
                <Form.Control
                  as="textarea"
                  placeholder="Enter the task you want the student to do."
                  value={courseInstructions}
                  onChange={(e) => setCourseInstructions(e.target.value)}
                  style={{ height: '200px' }}
                />
              </Form.Group>

              <div className="">
                <h5 className="mb-3">Add the code</h5>
              </div>

              <div className=" w-100 mb-3" style={{ height: '400px' }}>
                <Editor
                  height="100%"
                  width="100%"
                  theme="vs-dark"
                  defaultLanguage="python" // make this dynamic <<-------------------------------------
                  defaultValue={editorValue}
                  onChange={handleEditorChange}
                />
              </div>

              <Button type="submit" className="mb-4 w-100 auth-btns" size="lg">
                Add page
              </Button>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default addPage;
