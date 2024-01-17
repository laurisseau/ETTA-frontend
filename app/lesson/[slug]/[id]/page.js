'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Editor } from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Lesson = ({ params }) => {
  const id = params.id;
  const [editorValue, setEditorValue] = useState('');
  const [editorLanguage, setEditorLanguage] = useState('');
  const [outputValue, setOutputValue] = useState('');
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
      console.log(err);
      toast.error('Something went wrong with the compiler.');
    }
  };

  const handleNext = () => {
    if (index < length) {
      setLoading(true);
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setLoading(true);
      setIndex(index - 1);
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
            setLessonInfo(data[index].lessonInfo);
            setTask(data[index].task);
            setEditorLanguage(data[index].editorLanguage);
            setEditorValue(data[index].editorValue);
            setLength(data.length - 1);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    getLesson();
  }, [index]);

  //console.log(editorValue);
  console.log(index);
  const correctManicoLanguage = (editorLanguage) => {
    const languageMappings = {
      python3: 'python',
      nodejs: 'javascript',
      java: 'java',
    };

    return languageMappings[editorLanguage] || null;
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while fetching data
  }

  return (
    <div className="m-4">
      <div className="row">
        <div className="vh-100 col-md-6">
          <div className="lesson mb-4">
            <h2 className="lesson-header">{header}</h2>
            <p className="lesson-info">{lessonInfo}</p>
            <h1>Task</h1>
            <p className="lesson-task">{task}</p>
          </div>
        </div>
        <div className="p-0 m-0 vh-100 col-md-6">
          <div className="code-container h-50">
            <Editor
              height="100%"
              width="100%"
              theme="vs-dark"
              defaultLanguage={correctManicoLanguage(editorLanguage)}
              defaultValue={editorValue}
              onChange={handleEditorChange}
            />
            <div className="run-button">
              <Button onClick={() => handleCode(editorLanguage)}>Run</Button>
            </div>
          </div>
          <div
            style={{
              fontFamily: 'Monaco, monospace',
              whiteSpace: 'pre-wrap',
            }}
            className="output h-50 w-100 p-2 "
          >
            {outputValue}
          </div>
        </div>
        <div className="w-100 d-flex justify-content-end mt-2">
          <div>
            <Button className="me-2" onClick={handlePrev}>
              Prev
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
