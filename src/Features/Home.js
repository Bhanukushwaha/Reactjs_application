import React, { useEffect, useState, useCallback } from 'react';
import { BASE_URL } from '../Component/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Home.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const { user_data } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fetchStudentData = useCallback(async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Token': user_data?.authentication_token,
    };
    try {
      const res = await axios.get(`${BASE_URL}/api/students`, { headers });
      setStudents(res.data.data);
    } catch (error) {
      setError(error.message);
    }
  }, [user_data]); // Memoize the function with useCallback


  useEffect(() => {
    if (user_data?.authentication_token) {
      fetchStudentData();
    }
  }, [user_data, fetchStudentData]);

  const DeleteConfirmation = async (studentId) => {
    console.log('sdfsfsd')
    const headers = {
      'Content-Type': 'application/json',
      'Token': user_data?.authentication_token,
    };
    try {
      await axios.delete(`${BASE_URL}/api/students/${studentId}`, { headers })
      fetchStudentData();
    } catch (error) {
      setError(error.message);
    }
  }  

  return (
    <div>
      <div className="header-container">
        <Button onClick={() => navigate("/studentCreate")}>New student</Button>
        <h3 >Students</h3>
      </div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} 
      <table id="myTable">
        <thead>
          <tr className="header">
            <th>Id</th>     
            <th>FirstName</th>     
            <th>LastName</th>     
            <th>Roll No</th>     
            <th>Branch</th>     
            <th>Active</th>     
            <th colSpan="3">Active</th>     
          </tr>
        </thead>
        <tbody>
          {students.length ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td> 
                <td>{student.firstname}</td>       
                <td>{student.last_name}</td>       
                <td>{student.roll_number}</td>       
                <td>{student.branch}</td>       
                <td>{student.active ? "true" : 'false'}</td>       
                <td><Button onClick={() => DeleteConfirmation(student.id)} >Delete</Button></td>       
                <td><Button onClick={() => navigate(`/editstudent/${student.id}`)}>Edit</Button></td>       
                   
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No students found or data is loading...</td>
            </tr>
          )}       
        </tbody>
      </table>      
    </div>
  );
};
export default Home;
