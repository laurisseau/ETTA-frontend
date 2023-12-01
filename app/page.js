'use client';
import { Container, Card } from 'react-bootstrap';
//import dataPoints from '@/public/images/data-points-image.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Editor } from '@monaco-editor/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareFacebook,
  faSquareTwitter,
  faLinkedin,
  faSquareInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const initialEditorValue = 'word = "hello world"\n\nprint(word)';
  const [editorValue, setEditorValue] = useState(initialEditorValue);
  const [outputValue, setOutputValue] = useState('hello world');

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
      subscription: 'Free',
      description:
        'Python, a high-level, interpreted, general-purpose language, prioritizes readable code through significant whitespace. Its object-oriented design and constructs make it ideal for beginners diving into programming.',
    },
    {
      id: 2,
      name: 'Cyber security',
      subscription: 'Free',
      description:
        'Cybersecurity is safeguarding internet-connected systems from attacks by hackers, spammers, and cybercriminals. It aims to minimize the risk of cyber attacks and prevent unauthorized access to systems, networks, and technologies.',
    },
    {
      id: 3,
      name: 'Robotics',
      subscription: '???',
      description:
        'Robotics blends engineering and computer science, encompassing design, manufacture, and operation of robots. The goal is crafting intelligent machines aiding humans across diverse tasks.',
    },
    {
      id: 3,
      name: 'Basic Typing',
      subscription: '???',
      description:
        'Typing liberates mental energy, allowing focus on ideas over language intricacies. Learning keyboarding enhances accuracy and aids decoding, sight-reading skills, benefiting individuals, both children and adults, facing learning challenges.',
    },
  ];

  const handleEditorChange = (value, event) => {
    setEditorValue(value);
  };

  const formattedCode = editorValue.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const showFormattedCode = JSON.stringify(formattedCode);

  const handleCode = async () => {
    try {
      const { data } = await axios.post(
        '/api/permitAll/compiler',
        {
          language: 'python3',
          code: formattedCode,
        }
      );
      if (data) {
        setOutputValue(data.output);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="home-test">
        <Container className="d-flex flex-wrap justify-content-around pb-5 ">
          <div className="d-flex justify-content-center align-items-center home-header-width p-5">
            <div>
              <h1 className="hacker-font" style={{ fontWeight: '700' }}>
                Empower Students through Technology.
              </h1>
              <p className="hacker-font">
                Join Our Educational Movement to Introduce Coding in Schools.
              </p>
              <p className="hacker-font">
                Equip the next generation with digital skills using our
                cutting-edge curriculum, adaptable learning solutions, and
                cost-effective programs. Start their educational journey with
                us.
              </p>
              <button className="home-button">See Prices</button>
            </div>
          </div>

          <div className="home-header-img-width">
            <img
              style={{ height: '500px', width: '100%' }}
              alt="data-points"
              src="https://img.freepik.com/free-vector/data-points-concept-illustration_114360-1715.jpg?w=740&t=st=1700897592~exp=1700898192~hmac=34560987ad6984a47079df8084fe33d73a7e1417a840b4c530620c6058d5f0ef"
            ></img>
          </div>
        </Container>
      </div>
      <div style={{ backgroundColor: '#212529' }}>
        <Container className="d-flex flex-wrap-reverse justify-content-around pt-5 pb-5 mb-4">
          <div className="d-flex shadow code-box" style={{ height: '400px' }}>
            <div className="code h-100 w-50">
              <Editor
                height="100%"
                width="100%"
                theme="vs-dark"
                defaultLanguage="python"
                defaultValue={editorValue}
                onChange={handleEditorChange}
              />
            </div>
            <div
              style={{
                fontFamily: 'Monaco, monospace',
                whiteSpace: 'pre-wrap',
              }}
              className="output h-100 w-50 ps-2 pe-2"
            >
              {outputValue}
            </div>
          </div>
          <div
            className="d-flex align-items-center code-box-par ps-3 pe-3 pb-3"
            style={{ color: 'white' }}
          >
            <div>
              <h1 style={{ fontWeight: '700' }} className="mb-3 hacker-font">
                Dive into Coding Instantly.
              </h1>{' '}
              <p className="mb-3 hacker-font">
                Begin your coding journey within seconds. Experience the thrill
                of hands-on learning as you start writing real code from your
                very first lesson.
              </p>
              <button className="home-button" onClick={handleCode}>
                Run
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div id="courses">
        <Container className="mb-5">
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
                      <Card.Link
                        className="course-button mb-3 ms-3 me-3"
                        href="#"
                      >
                        Start
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </Carousel>
        </Container>
      </div>
      <footer
        style={{ backgroundColor: '#212529', color: 'white', padding: '20px' }}
      >
        <div className="">
          <div>
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <h3>Follow Us</h3>
                <div
                  className="d-flex justify-content-between mt-3"
                  style={{ width: '200px' }}
                >
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      size="2x"
                      color="#ffffff"
                    />
                  </Link>
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faSquareTwitter}
                      size="2x"
                      color="#ffffff"
                    />
                  </Link>
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="2x"
                      color="#ffffff"
                    />
                  </Link>
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faSquareInstagram}
                      size="2x"
                      color="#ffffff"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-us mt-3">
            <div>
              <h3>Contact Us</h3>
              <p>Email: info@example.com</p>
              <p>Phone: +1 123 456 7890</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2023 ETTA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
