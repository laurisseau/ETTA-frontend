'use client';
import { useEffect, useState } from 'react';
import {
  Container,
  Table,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const educatorCourse = () => {
  const [loading, setLoading] = useState(true);
  const [allEnrolled, setAllEnrolled] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const userInfoString = Cookies.get('educator');
        const promises = [];
        const getCourseByEducatorId = async () => {
          if (userInfoString) {
            try {
              const userInfo = JSON.parse(userInfoString);

              const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/educator/getCourseByEducatorId/${userInfo.sub}`,
                {
                  headers: { Authorization: `Bearer ${userInfo.accessToken}` },
                }
              );

              if (data) {
                setCourseId(data.courseId);
              }
            } catch (err) {
              toast.error(getError(err));
            }
          }
        };
        const getEnrolled = async () => {
          if (userInfoString) {
            try {
              const userInfo = JSON.parse(userInfoString);

              const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/educator/getAllEnrolled/${userInfo.sub}`,
                {
                  headers: { Authorization: `Bearer ${userInfo.accessToken}` },
                }
              );

              if (data) {
                setAllEnrolled(data);
              }
            } catch (err) {
              toast.error(getError(err));
            }
          }
        };

        promises.push(getCourseByEducatorId());
        promises.push(getEnrolled());

        await Promise.all(promises);

        setLoading(false);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    getAllData();
  }, []);

  return (
    <>
      {loading == false ? (
        <Container>
          <div className="mt-4">
            <h1>Course Enrollment Code</h1>
            <p>
              Share the following code with students to enroll in your class:
            </p>
            {courseId != null ? (
              <div className="bg-light p-3 mb-4">
                <code>{courseId}</code>
              </div>
            ) : (
              <Link className="course-button" href="/pricing">
                Create Class
              </Link>
            )}
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-between mt-4">
              <h2>Enrolled Students</h2>
              <InputGroup className="mb-3" style={{ maxWidth: '300px' }}>
                <FormControl
                  placeholder="Search students"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>
            </div>

            <Table className="table mt-3" responsive>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Email</th>
                </tr>
              </thead>
              <tbody>
                {allEnrolled.map((info) => (
                  <tr key={info.id}>
                    <td>{info.cognitoName}</td>
                    <td>{info.cognitoEmail}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      ) : (
        <div className="text-center mt-4">Loading...</div>
      )}
    </>
  );
};

export default educatorCourse;
