'use client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '@/components/TableComp';
import AdminNavbar from '@/components/AdminNavbar';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { useState, useEffect} from 'react';
import axios from 'axios';

const lessonPages = () => {
  const tableRows = ['id', 'name', 'language', 'numOfPages', 'Edit'];

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/permitAll/lessons`
        );

        if (data) {
          setLessons(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const addEdit = (data) => {
    for (let j = 0; j < data.length; j++) {
      data[j]['Edit'] = (
        <div key={j}>
          <Badge bg="primary" className="p-2 pointer">
            <Link href={`/allLessonPages/${data[j].id}`}>Edit</Link>
          </Badge>
          <Badge bg="primary" className="p-2 ms-3 pointer">
            <Link href={`/addPage/${data[j].id}`}>Add</Link>
          </Badge>
        </div>
      );
    }

    return data;
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <TableComp
          title={`Edit Lesson Pages`}
          data={addEdit(lessons)}
          rowsPerPage={10}
          tableRows={tableRows}
        />
      </Col>
    </Row>
  );
};

export default lessonPages;
