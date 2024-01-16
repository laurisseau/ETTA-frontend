'use client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '@/components/TableComp';
import AdminNavbar from '@/components/AdminNavbar';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '@/app/Provider';

const allLessonPages = ({ params }) => {
  const tableRows = ['id', 'pageNum', 'editorLanguage', 'lessonId', 'Edit'];

  const [pages, setPages] = useState([]);
  const userInfo = useContext(Context);
  const id = params.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/lessonPages/${id}`,
          {
            headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          }
        );

        if (data) {
          setPages(data);
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
          <Badge
            bg="primary"
            as={Link}
            href={`/updatePage/${data[j].id}`}
            className="p-2 pointer"
          >
            Edit
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
          data={addEdit(pages)}
          rowsPerPage={10}
          tableRows={tableRows}
        />
      </Col>
    </Row>
  );
};

export default allLessonPages;
