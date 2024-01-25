import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavbar from '@/components/AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCreditCard, faUser, faChalkboardUser} from '@fortawesome/free-solid-svg-icons';

const adminDashboard = () => {
  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <Row className="mt-4 w-100 d-flex justify-content-center">
          <Col lg={4} md={11} className="">
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-cosmic text-white">
                <div className="font-weight-light">Total Courses</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">3</h3>
                  <FontAwesomeIcon icon={faChalkboardUser}  className='fs-3'/>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="" lg={4} md={11}>
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-burning text-white">
                <div className="font-weight-light">Total Income</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">$1,000</h3>
                  <FontAwesomeIcon icon={faCreditCard}  className='fs-3'/>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="" lg={4} md={11}>
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-Ohhappiness text-white">
                <div className="font-weight-light">Total Users</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">53</h3>
                  <FontAwesomeIcon icon={faUser} className='fs-3'/>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default adminDashboard;
