'use client';
import { Container } from 'react-bootstrap';
//import dataPoints from '@/public/images/data-points-image.jpg';
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function Home() {
  const initialEditorValue = 'word = "hello world"\n\nprint(word)';
  const [editorValue, setEditorValue] = useState(initialEditorValue);
  const [outputValue, setOutputValue] = useState('hello world');

  const handleEditorChange = (value, event) => {
    setEditorValue(value);
  };

  const formattedCode = editorValue.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  const showFormattedCode = JSON.stringify(formattedCode);

  const handleCode = async () => {
    try {
      const { data } = await axios.post('/api/permitAll/compiler', {
        language: 'python3',
        code: formattedCode,
      });
      if (data) {
        setOutputValue(data.output);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong with the compiler.');
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
        <div>
          <Contact/>
        </div>
      </div>
      <Footer />
    </div>
  );
}
