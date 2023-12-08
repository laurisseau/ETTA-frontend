import { Card, Container, CardTitle, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

const studentPrices = () => {
  return (
    <div className="mb-5">
      <Container>
        <div>
          <h1 className="text-center mt-4">Student Prices</h1>

          <div
            className="red d-flex flex-wrap justify-content-around align-items-center"
            style={{ height: '450px' }}
          >
            <Card
              className="m-0 p-0 "
              style={{ width: '18rem', height: '90%' }}
            >
              <div className="d-flex justify-content-center">
                <p
                  style={{
                    border: '1px solid black',
                    borderRadius: '20px',
                    width: '100px',
                  }}
                  className="mb-0 mt-4 mb-1 text-center"
                >
                  Basic
                </p>
              </div>
              <div className="justify-content-center text-center d-flex align-items-start">
                <span className="h1">FREE</span>
                <span className="mt-2" style={{ fontSize: '13px' }}>
                  / MO
                </span>
              </div>
              <p className=" text-center">Class of 20 and lower</p>
              <div className="pe-2">
                <ul>
                  <li className="mb-1">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li className="mb-4">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <Link className="course-button  ms-3 me-3" href="#">
                    Creat Class
                  </Link>
                </ul>
              </div>
            </Card>
            <Card
              className="m-0 p-0 red"
              style={{ width: '18rem', height: '100%' }}
            >
              <div className="d-flex justify-content-center">
                <p
                  style={{
                    border: '1px solid black',
                    borderRadius: '20px',
                    width: '100px',
                  }}
                  className="mb-0 mt-4 mb-1 text-center"
                >
                  Premium
                </p>
              </div>
              <div className="justify-content-center text-center d-flex align-items-start">
                <span className="h1">$150</span>
                <span className="mt-2" style={{ fontSize: '13px' }}>
                  / MO
                </span>
              </div>
              <p className=" text-center">Class of 100 and lower</p>
              <div className="pe-2">
                <ul>
                  <li className="mb-1">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li className="mb-1">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li className="mb-3">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <Link className="course-button  ms-3 me-3" href="#">
                    Creat Class
                  </Link>
                </ul>
              </div>
            </Card>
            <Card className="m-0 p-0" style={{ width: '18rem', height: '90%' }}>
              {' '}
              <div className="d-flex justify-content-center">
                <p
                  style={{
                    border: '1px solid black',
                    borderRadius: '20px',
                    width: '100px',
                  }}
                  className="mb-0 mt-4 mb-1 text-center"
                >
                  Advanced
                </p>
              </div>
              <div className="justify-content-center text-center d-flex align-items-start">
                <span className="h1">$100</span>
                <span className="mt-2" style={{ fontSize: '13px' }}>
                  / MO
                </span>
              </div>
              <p className=" text-center">Class of 50 and lower</p>
              <div className="pe-2">
                <ul>
                  <li className="mb-1">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li className="mb-3">
                    <Row>
                      <Col sm={1} className="p-0">
                        <div className="d-flex align-items-center h-100">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </Col>
                      <Col>
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <Link className="course-button  ms-3 me-3" href="#">
                    Creat Class
                  </Link>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default studentPrices;
