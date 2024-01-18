'use client';
import { Button, Form } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavbar from '@/components/AdminNavbar';
import axios from 'axios';
import { Context } from '@/app/Provider';
import { toast } from 'react-toastify';

const updateLesson = ({ params }) => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const slug = name.replace(/\s+/g, '-');
  const [subscription, setSubscription] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');

  const userInfo = useContext(Context);
  const id = params.id;

  useEffect(() => {
    const getData = async () => {
      if (userInfo) {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/lesson/${id}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setName(data.name);
            setLanguage(data.language);
            setSubscription(data.subscription);
            setDescription(data.description);
            setSubscriptionId(data.subscriptionId);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    getData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/updateLesson/${id}`,
        {
          name,
          slug,
          subscription,
          subscriptionId,
          language,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        }
      );

      if (data) {
        toast.success('Lesson updated');
      }
    } catch (err) {
      //console.error(err);
      toast.error('Something went wrong');
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/deleteLesson/${id}`,
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        }
      );

      if (data) {
        window.location.href = '/adminLessons';
      }
    } catch (err) {
      //console.error(err);
      toast.error('Something went wrong');
    }
  };

  const correctManicoLanguage = (editorLanguage) => {
    const languageMappings = {
      python3: 'python',
      nodejs: 'javascript',
      java: 'java',
    };

    return languageMappings[editorLanguage] || null;
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
              <h5 className="mb-3">Update your lesson</h5>
            </div>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-4" controlId="name">
                <Form.Control
                  placeholder="Enter the name of the lesson"
                  className="address-form-height"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="description">
                <Form.Select
                  aria-label="Default select example"
                  value={subscription}
                  onChange={(e) => setSubscription(e.target.value)}
                >
                  <option>Select the lessons subscription</option>
                  <option value="Basic">Basic</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Premium">Premium</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4" controlId="subscriptionId">
                <Form.Control
                  placeholder="Enter the Stripe Subscription Id"
                  className="address-form-height"
                  value={subscriptionId}
                  onChange={(e) => setSubscriptionId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="language">
                <Form.Select
                  aria-label="Default select example"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>Select the lessons language</option>
                  <option value="python3">python3</option>
                  <option value="nodejs">nodejs</option>
                  <option value="java">java</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4" controlId="description">
                <Form.Control
                  as="textarea"
                  placeholder="Describe the lesson your adding (252 character limit)"
                  className="address-textarea-height"
                  value={description}
                  onChange={(e) => {
                    if (e.target.value.length <= 252) {
                      setDescription(e.target.value);
                    }
                  }}
                />
              </Form.Group>

              <div className="d-flex justify-content-between flex-wrap">
                <Button type="submit" className="mb-4 auth-btns" size="lg">
                  Update Lesson
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

export default updateLesson;
