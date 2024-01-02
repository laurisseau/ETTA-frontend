import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '@/components/TableComp';
import AdminNavbar from '@/components/AdminNavbar';
import Badge from 'react-bootstrap/Badge';

const lessonPages = () => {
  const tableRows = ['Id', 'Lesson', 'NumOfPages', 'Edit'];

  const data = [{ Id: 0, Lesson: 'Python', NumOfPages: 12 }];

  const addEdit = (data) => {
    for (let j = 0; j < data.length; j++) {
      data[j]['Edit'] = (
        <div key={j}>
          <Badge bg="primary" className="p-2 pointer">
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
          data={addEdit(data)}
          rowsPerPage={10}
          tableRows={tableRows}
          addBar={"/addPage"}
        />
      </Col>
    </Row>
  );
};

export default lessonPages;