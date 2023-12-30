import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '@/components/TableComp';
import AdminNavbar from '@/components/AdminNavbar';

const users = () => {
    const tableRows = ['Id', 'Name', 'Grade'];

    const data = [{ Id: 0, Name: 'Laurisseau', Grade: 12 }];
    return (
        <Row>
          <Col className="" md={3} sm={4} xs={3}>
            <div className="admin-navbar-wrapper">
              <AdminNavbar />
            </div>
          </Col>
          <Col md={9} sm={8} xs={9} className="">
            <TableComp
              title={`All Users`}
              data={data}
              rowsPerPage={5}
              tableRows={tableRows}
            />
          </Col>
        </Row>
      );
}

export default users;