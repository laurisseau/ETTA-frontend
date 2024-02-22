'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Editor } from '@monaco-editor/react';
import { Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { correctManicoLanguage, getError } from '@/app/utils';

const Lesson = ({ params }) => {
  const id = params.id;
  const [editorValue, setEditorValue] = useState('');
  const [editorLanguage, setEditorLanguage] = useState('');
  const [outputValue, setOutputValue] = useState('This is the terminal! ');
  const [subHeader, setSubHeader] = useState('');
  const [header, setHeader] = useState('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [task, setTask] = useState('');
  const [length, setLength] = useState(0);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handleCode = async (editorLanguage) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/permitAll/compiler`,
        {
          language: editorLanguage,
          code: editorValue,
        }
      );
      if (data) {
        setOutputValue(data.output);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleNext = () => {
    if (index < length) {
      setLoading(true);
      setIndex(index + 1);
      setOutputValue('This is the terminal! ');
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setLoading(true);
      setIndex(index - 1);
      setOutputValue('This is the terminal! ');
    }
  };

  useEffect(() => {
    const userInfoString = Cookies.get('user');

    const getLesson = async () => {
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);

        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/lessonPages/${id}`,
            {
              headers: { Authorization: `Bearer ${userInfo.accessToken}` },
            }
          );

          if (data) {
            setHeader(data[index].header);
            setSubHeader(data[index].subHeader)
            setLessonInfo(data[index].lessonInfo);
            setTask(data[index].task);
            setEditorLanguage(data[index].lessonId.language);
            setEditorValue(data[index].editorValue);
            setLength(data.length - 1);
            setLoading(false);
          }
        } catch (err) {
          toast.error(getError(err));
        }
      }
    };

    getLesson();
  }, [index]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-4">
      <div className="row">
        <div className="col-md-6 mb-2 lesson-box">
          <Card
            className="lesson-font p-3"
            style={{
              whiteSpace: 'pre-wrap',
              backgroundColor: '#1E1E1E',
              color: 'white',
              overflowY: 'auto',
              height: '420px',
            }}
          >
            <div className="lesson mb-4">
              <h2 className="lesson-header">{header}</h2>
              <h4 className='lesson-subheader'>{subHeader}</h4>
              <p className="border-bottom pb-3 lesson-info">{lessonInfo}</p>
              <h1>Task</h1>
              <p className="lesson-task pt-1">{task}</p>
            </div>
          </Card>
        </div>

        <div className="p-0 m-0 col-md-6" style={{ height: '420px' }}>
          <div
            style={{ backgroundColor: '#1E1E1E', height: '70%' }}
            className="d-flex justify-content-center align-items-center rounded code-container"
          >
            <Editor
              height="98%"
              width="98%"
              theme="vs-dark"
              defaultLanguage={correctManicoLanguage(editorLanguage)}
              defaultValue={editorValue}
              onChange={handleEditorChange}
            />
            <div className="run-button">
              <Button onClick={() => handleCode(editorLanguage)}>Run</Button>
            </div>
          </div>
          <Card
            style={{
              fontFamily: 'Monaco, monospace',
              whiteSpace: 'pre-wrap',
              height: '28%',
              backgroundColor: '#1E1E1E',
              color: 'white',
              overflowY: 'auto',
            }}
            className=" mt-2 w-100 p-2 "
          >
            {outputValue}
          </Card>
        </div>
      </div>

      <div className="w-100 d-flex justify-content-end mt-1 h-100">
        <div>
          <Button className="me-2" onClick={handlePrev}>
            Prev
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
