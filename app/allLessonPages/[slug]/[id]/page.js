'use client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '@/components/TableComp';
import AdminNavbar from '@/components/AdminNavbar';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Context } from '@/app/Provider';
import { getError } from '@/app/utils';
import { toast } from 'react-toastify';

const allLessonPages = ({ params }) => {
  const tableRows = ['id', 'pageNum', 'header', 'Edit'];

  const [pages, setPages] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const id = params.id;
  const slug = params.slug;

  useEffect(() => {
    const userInfoString = Cookies.get('admin');

    const getData = async () => {
      try {
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);

          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/lessonPages/${id}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setPages(data);
            setPageNum(data.length + 1);
          }
        }
      } catch (err) {
        toast.error(getError(err));
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
          addBar={`/addPage/${slug}/${pageNum}/${id}`}
        />
      </Col>
    </Row>
  );
};
/*

*/
export default allLessonPages;
