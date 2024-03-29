'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavbar from '@/components/AdminNavbar';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { correctManicoLanguage, getError } from '@/app/utils';

const updatePage = ({ params }) => {
  const [pageNum, setPageNum] = useState(0);
  const [header, setHeader] = useState('');
  const [subHeader, setSubHeader] = useState('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [task, setTask] = useState('');
  const [editorLanguage, setEditorLanguage] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [lessonId, setLessonId] = useState({});
  const [userObj, setUserObj] = useState({});
  const [loading, setLoading] = useState(true);
  const id = params.id;

  const handleEditorChange = (value, event) => {
    setEditorValue(value);
  };

  useEffect(() => {
    const userInfoString = Cookies.get('admin');

    const getPageData = async () => {
      try {
        if (userInfoString) {
          setUserObj(JSON.parse(userInfoString));
          const userInfo = JSON.parse(userInfoString);
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/lessonPage/${id}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setPageNum(data.pageNum);
            setHeader(data.header);
            setSubHeader(data.subHeader);
            setLessonInfo(data.lessonInfo);
            setTask(data.task);
            setEditorValue(data.editorValue);
            setEditorLanguage(data.lessonId.language);
            setLessonId(data.lessonId);
            setLoading(false);
          }
        }
      } catch (err) {
        toast.error(getError(err));
      }
    };

    getPageData();
  }, [loading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/lessonPage/${id}`,
        {
          pageNum,
          header,
          subHeader,
          lessonInfo,
          lessonId,
          task,
          editorValue,
        },
        {
          headers: { Authorization: `Bearer ${userObj.accessToken}` },
        }
      );

      if (data) {
        window.location.href = `/lessonPages`;
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/deletePage/${id}`,
        {
          headers: { Authorization: `Bearer ${userObj.accessToken}` },
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
              <h5 className="mb-3">Update page</h5>
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
                  defaultLanguage={correctManicoLanguage(editorLanguage)}
                  defaultValue={editorValue}
                  onChange={handleEditorChange}
                />
              </div>

              <div className="d-flex justify-content-between flex-wrap">
                <Button type="submit" className="mb-4 auth-btns" size="lg">
                  Update page
                </Button>

                <Button
                  onClick={deleteHandler}
                  className="mb-4 auth-btns"
                  size="lg"
                >
                  Delete
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default updatePage;
