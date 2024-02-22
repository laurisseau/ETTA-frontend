'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavbar from '@/components/AdminNavbar';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '@/app/Provider';
import { correctManicoLanguage } from '@/app/utils';
import { getError } from '@/app/utils';

const addPage = ({ params }) => {
  const [pageNum, setPageNum] = useState(params.pageNum);
  const [header, setHeader] = useState('');
  const [subHeader, setSubHeader] = useState('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [task, setTask] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState('');
  const userInfo = useContext(Context);
  const slug = params.slug;
  const lessonId = params.id;

  useEffect(() => {
    const getData = async () => {
      if (userInfo) {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/lesson/${lessonId}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setLesson(data);
            setLoading(false);
          }
        } catch (err) {
          toast.error(getError(err));
        }
      }
    };

    getData();
  }, [loading]);

  const handleEditorChange = (value, event) => {
    setEditorValue(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/addPage`,
        {
          pageNum,
          header,
          subHeader,
          lessonInfo,
          task,
          editorLanguage: slug,
          editorValue,
          lessonId: lesson,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        }
      );

      if (data) {
        window.location.href = '/lessonPages';
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <Form.Group className="mb-4" controlId="PageNum">
                <Form.Control
                  placeholder="Enter the page number"
                  className="address-form-height"
                  value={pageNum}
                  onChange={(e) => setPageNum(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="header">
                <Form.Control
                  placeholder="Enter the header for this page"
                  className="address-form-height"
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="subHeader">
                <Form.Control
                  placeholder="Enter the subheader for this page"
                  className="address-form-height"
                  value={subHeader}
                  onChange={(e) => setSubHeader(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="lessonInfo">
                <Form.Control
                  as="textarea"
                  placeholder="Enter the lesson for this page"
                  value={lessonInfo}
                  onChange={(e) => setLessonInfo(e.target.value)}
                  style={{ height: '300px' }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="task">
                <Form.Control
                  as="textarea"
                  placeholder="Enter the task you want the student to do."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
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
                  defaultLanguage={correctManicoLanguage(slug)}
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
