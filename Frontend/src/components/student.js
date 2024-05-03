import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './student.css';
import './home.css';

const Student = () => {
    const [deps, setDeps] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/student/michael.johnson@gmail.com/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setDeps(data);
                } else if (typeof data === 'object' && Object.keys(data).length > 0) {
                    setDeps([data]); // Wrap single object into array
                } else {
                    console.error('Data received is not valid:', data);
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='body-home'>
            <div className='bodyheader'>
                <div className='texttitle'>Student Management Portal</div>
                <div>
                    <button
                        onClick={handleSignOut}
                        style={{ position: 'relative', left: '670px', top: '15px', width: '100px', padding: '8px', borderRadius: '10px',borderColor:'transparent',color:'white', background: '#363740' }}>
                        Sign out
                    </button>
                </div>

                <div className='optionmenu'>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h2 style={{marginBottom:'25px'}}>Student</h2>
                        <div style={{ color: 'white' }}>
                        <hr style={{ width: '98%',marginBottom:'15px',borderColor: 'cyan' }} />
                            <Link to="/profile"style={{ paddingTop: '440px', textDecoration: 'none', color: 'white' }}>Profile</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px',borderColor: 'cyan' }} />
                        </div>
                        <div style={{ color: 'white' }}>
                            <Link to="/profile" style={{ paddingTop: '440px',textDecoration: 'none', color: 'white' }}>Exams</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px', borderColor: 'cyan' }} />
                        </div>
                        <div style={{ color: 'white' }}>
                            <Link to="/profile" style={{ paddingTop: '440px',textDecoration: 'none', color: 'white' }}>Fee payment</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px', borderColor: 'cyan' }} />
                        </div>
                        <div style={{ color: 'white' }}>
                            <Link to="/profile" style={{ paddingTop: '440px',textDecoration: 'none', color: 'white' }}>Activities</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px', borderColor: 'cyan' }} />
                        </div>
                        <div style={{ color: 'white' }}>
                            <Link to="/settings" style={{ marginTop:'500px',textDecoration: 'none', color: 'white' }}>Settings</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px', borderColor: 'cyan' }} />
                        </div>

                    </div>
                </div>
                <div className='box'>
            <p id="before-table"></p>
            <Table className="table-bordered" id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map((stu, index) => (
                        <tr key={index}>
                            <td>{stu.universityid}</td>
                            <td>{stu.fname}</td>
                            <td>{stu.lname}</td>
                            <td>{stu.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
                
            

              <div className='foot'>
                <br></br>
                &copy; 2024 Student Management System
              </div>
            </div>
        </div>
        
        
    );
}

export default Student;


