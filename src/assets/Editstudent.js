import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { BASE_URL } from '../Component/config'; // Ensure BASE_URL is imported correctly
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Editstudent() {
  const { id } = useParams();
  // Dynamically defining the fields to be generated in the form
  const fields = [
    { key: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
    { key: 'last_name', label: 'Last Name', type: 'text', placeholder: 'Enter Last Name' },
    { key: 'roll_number', label: 'Roll Number', type: 'text', placeholder: 'Enter Roll Number' },
    { key: 'district', label: 'District', type: 'text', placeholder: 'Enter District' },
    { key: 'branch', label: 'Branch', type: 'text', placeholder: 'Enter Branch' },
  ];

  const [formData, setFormData] = useState({
    firstname: '',
    last_name: '',
    roll_number: '',
    district: '',
    branch: '',
    active: false, // Checkbox state
  });

  const { user_data } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Async fetch function to make the POST request
  const fetch_data = async (api, body) => {
    const res = await fetch(api, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Token': user_data.authentication_token,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    try {
      const result = await fetch_data(`${BASE_URL}/api/students/${id}`, formData);
      if (result.success) {
        navigate('/students'); // Redirect on success
      }
    } catch (error) {
      console.error('Error during student data submission:', error.message);
    }
  };

  // Handle input changes dynamically
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // Handle checkbox toggle
  const toggleActive = () => {
    setFormData({
      ...formData,
      active: !formData.active,
    });
  };

  useEffect(() => {
    // Fetch profile data and populate form fields
    const fetchStudentData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Token': user_data.authentication_token
        }      
        const response = await axios.get(`${BASE_URL}/api/students/${id}`, { headers });
        const profileData = response.data.data;

        setFormData({
          firstname: profileData.firstname,
          last_name: profileData.last_name,
          roll_number: profileData.roll_number,
          district: profileData.district,
          branch: profileData.branch,
          active: profileData.active,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    if (user_data.authentication_token) {
      fetchStudentData();
    }
  }, [id, user_data.authentication_token]); // Include user_data.authentication_token in the dependency array

  return (
    <Form className="container" onSubmit={handleSubmit}>
      <Row className="mb-3">
        {fields.map((field, index) => (
          <Form.Group as={Col} controlId={`formGrid${field.key}`} key={index}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              value={formData[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
            />
          </Form.Group>
        ))}
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          type="checkbox"
          checked={formData.active}
          onChange={toggleActive} // Toggle checkbox
          label="Active"
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="secondary" onClick={() => navigate("/home")} className="ms-2">
        Back to home
      </Button>
    </Form>
  );
}

export default Editstudent;
