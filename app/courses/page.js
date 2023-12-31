'use client';
import Footer from '@/components/Footer';
import { Container, Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { useState, useEffect } from 'react';
import CenteredModal from '@/components/CenteredModal';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link';

const courses = () => {
  const [modalShow, setModalShow] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  const [enrolled, setEnrolled] = useState(null);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 991, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // max 252 charachter count

  const data = [
    {
      id: 1,
      name: 'Python',
      subscription: 'Basic',
      description:
        'Python, a high-level, interpreted, general-purpose language, prioritizes readable code through significant whitespace. Its object-oriented design and constructs make it ideal for beginners diving into programming.',
    },
    {
      id: 2,
      name: 'Cyber security',
      subscription: 'Basic',
      description:
        'Cybersecurity is safeguarding internet-connected systems from attacks by hackers, spammers, and cybercriminals. It aims to minimize the risk of cyber attacks and prevent unauthorized access to systems, networks, and technologies.',
    },
    {
      id: 3,
      name: 'Robotics',
      subscription: 'Premium',
      description:
        'Robotics blends engineering and computer science, encompassing design, manufacture, and operation of robots. The goal is crafting intelligent machines aiding humans across diverse tasks.',
    },
    {
      id: 3,
      name: 'Basic Typing',
      subscription: 'Advanced',
      description:
        'Typing liberates mental energy, allowing focus on ideas over language intricacies. Learning keyboarding enhances accuracy and aids decoding, sight-reading skills, benefiting individuals, both children and adults, facing learning challenges.',
    },
  ];

  const joinClassSuccess = () => {
    setRefreshData(true);
  };

  useEffect(() => {
    const userInfoString = Cookies.get('user');

    const getUserInfo = () => {
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);
          setAccessToken(userInfo.accessToken);
        } catch (error) {
          console.error('Error parsing user info JSON:', error);
        }
      }
    };

    const isEnrolled = async () => {
      if (userInfoString) {
        try {
          const userInfo = JSON.parse(userInfoString);

          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/ifEnrolled/${userInfo.sub}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setEnrolled(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    isEnrolled();
    getUserInfo();
  }, [refreshData]);

  const courseAccess = (userSubscription, courseSubscription, courseSlug) => {
    let hasAccess = false;

    switch (userSubscription) {
      case 'Basic':
        hasAccess = courseSubscription === 'Basic';
        break;

      case 'Advanced':
        hasAccess =
          courseSubscription === 'Basic' || courseSubscription === 'Advanced';
        break;

      case 'Premium':
        hasAccess =
          courseSubscription === 'Basic' ||
          courseSubscription === 'Advanced' ||
          courseSubscription === 'Premium';
        break;

      default:
        Swal.fire('Your class subscription does not cover this course');
        return;
    }

    if (hasAccess) {
      window.location.href = `/courses/${courseSlug.replace(/ /g, '_')}`;
    } else {
      Swal.fire('Your class subscription does not cover this course');
    }
  };

  const courseButtons = (course) => {
    if (Cookies.get('user') == undefined) {
      return (
        <Link href="/studentLogin" className="course-button mb-3 ms-3 me-3">
          Start
        </Link>
      );
    } else if (enrolled == null) {
      return (
        <button
          className="course-button mb-3 ms-3 me-3"
          onClick={() => setModalShow(true)}
        >
          Start
        </button>
      );
    } else if (enrolled != null) {
      return (
        <button
          className="course-button mb-3 ms-3 me-3"
          onClick={() =>
            courseAccess(
              enrolled.course.subscription,
              course.subscription,
              course.name
            )
          }
        >
          Start
        </button>
      );
    }
  };

  return (
    <div>
      <div>
        <Container className="mt-3 mb-5">
          <CenteredModal
            show={modalShow}
            accessToken={accessToken}
            onHide={() => setModalShow(false)}
            joinClassSuccess={joinClassSuccess}
          />
          <div className="d-flex justify-content-center">
            <h1
              className=" text-center mb-5 hacker-font border-bottom border-dark pb-2"
              style={{ fontWeight: '700', width: '300px' }}
            >
              Courses
            </h1>
          </div>

          <Carousel
            swipeable={true}
            responsive={responsive}
            infinite={true}
            partialVisible={true}
          >
            {data ? (
              data.map((course) => (
                <div className="d-flex justify-content-center" key={course.id}>
                  {' '}
                  <Card
                    className="m-0 p-0"
                    style={{ width: '18rem', height: '400px' }}
                  >
                    <Card.Body className=" m-0 p-0 card-body">
                      <div className="pe-3 ps-3 pt-3 card-header-color ">
                        <Card.Title className=" ">{course.name}</Card.Title>

                        <Card.Subtitle className=" text-muted  pt-2 pb-2">
                          Subscription: {course.subscription}
                        </Card.Subtitle>
                      </div>
                      <Card.Text className=" ps-3 pe-3">
                        {course.description}
                      </Card.Text>
                      {courseButtons(course)}
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div className="text-center"> Loading... </div>
            )}
          </Carousel>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default courses;
