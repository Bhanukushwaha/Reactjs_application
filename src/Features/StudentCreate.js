import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BASE_URL } from '../Component/config'; // Make sure BASE_URL is imported correctly
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function StudentCreate() {
  const [firstname, setFirstname] = useState('');
  const [last_name, setLast_name] = useState('');
  const [roll_number, setRoll_number] = useState('');
  const [district, setDistrict] = useState('');
  const [branch, setBranch] = useState('');
  const [active, setActive] = useState(false); // Default active state as boolean
  const { user_data } = useSelector(state => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  // Async fetch function to make the POST request
  const fetch_data = async (api, body) => {
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token': user_data.authentication_token,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  };

  // Use async function properly for form submission
  async function authenticate(event) {
    event.preventDefault(); // Prevent form reload
    const body = { last_name, firstname, roll_number, district, branch, active };
    try {
      // Call the API and await the response
      const result = await fetch_data(`${BASE_URL}/api/students`, body);
      // console.log(result); // Handle the response from the API

      // Navigate to a new route after success
      if (result.success) {
        navigate('/students'); // Redirect to '/students' page after success
      }
    } catch (error) {
      console.error('Error during student data submission:', error.message);
    }
  }

  return (
    <Form className="container">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            value={firstname}
            onChange={(text) => setFirstname(text.target.value)}
            placeholder="Enter Firstname"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={last_name}
            onChange={(text) => setLast_name(text.target.value)}
            placeholder="Enter Last Name"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Roll Number</Form.Label>
        <Form.Control
          value={roll_number}
          onChange={(text) => setRoll_number(text.target.value)}
          placeholder="Enter Roll Number"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>District</Form.Label>
          <Form.Control
            value={district}
            onChange={(text) => setDistrict(text.target.value)}
            placeholder="Enter District"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Branch</Form.Label>
          <Form.Control
            value={branch}
            onChange={(text) => setBranch(text.target.value)}
            placeholder="Enter Branch"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)} // Toggle active state
          label="Check me out"
        />
      </Form.Group>
      <div>
        <Button onClick={authenticate} size="sm"> submit form</Button>{' '}
        <Button onClick={() => navigate("/home")} size="sm">Back to home</Button>
      </div>
    </Form>
  );
}
export default StudentCreate;
