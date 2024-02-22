'use client';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { Context } from '../app/Provider';
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '@/app/utils';

const PricingCard = ({ title, price, description, features, height }) => {
  const value = useContext(Context);
  const userInfo = value;

  const createClass = async () => {
    try {
      if (userInfo.role != 'EDUCATOR') {
        return toast.error('You have to be an educator to create a class.');
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/educator/createCourse`,
        {
          educatorId: userInfo.sub,
          subscriptionId: title,
          subscription: title,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        }
      );

      if (data) {
        window.location.href = '/educatorCourse';
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <Card
        className="m-0 p-0 mt-4 mb-4 "
        style={{ width: '18rem', height: height }}
      >
        <div className="d-flex justify-content-center ">
          <p
            style={{
              border: '1px solid black',
              borderRadius: '20px',
              width: '100px',
            }}
            className="mb-0 mt-4 mb-1 text-center"
          >
            {title}
          </p>
        </div>
        <div className="justify-content-center text-center d-flex align-items-start">
          <span className="h1">{price}</span>
          <span className="mt-2" style={{ fontSize: '13px' }}>
            / MO
          </span>
        </div>
        <p className=" text-center">{description}</p>
        <div className="ps-3 pe-2" style={{ height: '50%' }}>
          <ul className="d-flex flex-column justify-content-around h-100">
            {features.map((feature, index) => (
              <li key={index} className="mb-1">
                <Row>
                  <Col xs={1} className="p-0">
                    <div className="d-flex align-items-center h-100">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                  </Col>
                  <Col>
                    <div>{feature}</div>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="text-center w-100"
          style={{ marginTop: 'auto', marginBottom: '23px' }}
        >
          {title == 'Basic' ? (
            <button onClick={createClass} className="course-button">
              Create Class
            </button>
          ) : (
            <button className="disabled course-button">Create Class</button>
          )}
        </div>
      </Card>
    </>
  );
};

export default PricingCard;
