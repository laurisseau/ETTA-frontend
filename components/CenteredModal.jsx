import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getError } from '@/app/utils';

function CenteredModal({ show, accessToken, onHide, joinClassSuccess }) {
  const [courseId, setCourseId] = useState('');

  const joinClass = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/joinClass`,
        {
          courseId,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (data) {
        joinClassSuccess();
        onHide();
        Swal.fire(`${data}`);
      }
    } catch (err) {
      onHide();
      toast.error(getError(err))
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter class code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={joinClass}>
          <Form.Group className="mb-4" controlId="courseId">
            <Form.Control
              type="courseId"
              placeholder="Enter class code"
              className="address-form-height"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Enter</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModal;
