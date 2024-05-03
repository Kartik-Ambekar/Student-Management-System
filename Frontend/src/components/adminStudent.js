import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';
import './adminhome.css';
import { auth, googleProvider } from './firebase.js';
import { signOut } from 'firebase/auth';
import { db } from './firebase.js';
import { getDocs,collection } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminStudent = () => {
    const navigate = useNavigate()
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        universityid: '',
        fname: '',
        lname: '',
        email: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/students/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/students/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Clear form data after submission
            setFormData({
                universityid: '',
                fname: '',
                lname: '',
                email: ''
            });
            // Refetch data after adding a new student
            fetchData();
        } catch (error) {
            console.error('There was a problem with the add operation:', error);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/students/${studentId}/`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            // Refetch data after deletion
            fetchData();
        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
            alert('Failed to delete student. Please try again later.');
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='body-homes'>
        <div className='bodyheaders'>
            <div className='texttitles'>Student Management Portal</div>
            <div>
                <button
                    onClick={handleSignOut}
                    style={{ position: 'relative', left: '650px', top: '15px', width: '100px', padding: '8px', borderRadius: '10px',borderColor:'transparent',color:'white', background: '#363740' }}>
                    Sign out
                </button>
            </div>

    
            <div style={{position:'absolute',top:'10%'}}>
                <p id="before-table"></p>
                    <Table className="table table-bordered" id="dataTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Year</th>
                    <th>Department</th>
                    <th>Fees</th>
                    <th>Exam Result</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.universityid}</td>
                        <td>{student.fname}</td>
                        <td>{student.lname}</td>
                        <td>{student.email}</td>
                        <td>{student.phnumber}</td>
                        <td>{student.year}</td>
                        <td>{student.department}</td>
                        <td>{student.feesamount}</td>
                        <td>{student.examresult}</td>
                        <td><Button variant="danger" onClick={() => handleDelete(student.universityid)}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="universityid">
                <Form.Label>University ID</Form.Label>
                <Form.Control type="text" name="universityid" value={formData.universityid} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="fname" value={formData.fname} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="lname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lname" value={formData.lname} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="phnumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phnumber" value={formData.phnumber} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control type="text" name="year" value={formData.year} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" name="department" value={formData.department} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="feesamount">
                <Form.Label>Fee Amount</Form.Label>
                <Form.Control type="text" name="feesamount" value={formData.feesamount} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="examresult">
                <Form.Label>Exam Resultt</Form.Label>
                <Form.Control type="text" name="examresult" value={formData.examresult} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Student
            </Button>
            
        </Form>
    </div>

          <div className='foots'>
            <br></br>
            &copy; 2024 Student Management System
          </div>
        </div>
    </div>
    );
}

export default AdminStudent;
