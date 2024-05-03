import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import './home.css';
import { auth, googleProvider } from './firebase.js';
import { signOut } from 'firebase/auth';
import { db } from './firebase.js';
import { getDocs,collection } from "firebase/firestore";
import { useLocation } from 'react-router-dom';

const Homepage = ({ email }) => {
    const location = useLocation();
    const emails = location.state.email;
    const navigate = useNavigate();
    const [Student, setStudent] = useState([]);
    const studentRef = collection(db, "Emails");
    const [deps, setDeps] = useState([]);
    console.log(emails);

    useEffect(() => {
        const getStudent = async () => {
            try {
                const data = await getDocs(studentRef);
                const actualData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
                setStudent(actualData);
                console.log(actualData);
            } catch (err) {
                console.error(err);
            }
        };
        getStudent();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/student/${emails}/`);
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


    const handleProfileClick = () => {
        navigate('/profile'); // Navigate to the '/profile' route
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
        <div className='body-home'>
            <div className='bodyheader'>
                <div className='texttitle'>Student Management Portal</div>
                <div>
                    <button
                        onClick={handleSignOut}
                        style={{ position: 'relative', left: '670px', top: '15px', width: '100px', 
                        padding: '8px', borderRadius: '10px',borderColor:'transparent',color:'white', background: '#363740' }}>
                        Sign out
                    </button>
                </div>

                <div className='optionmenu'>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h2 style={{marginBottom:'25px'}}>Student</h2>
                        <div style={{ color: 'white' }}>
                        <hr style={{ width: '98%',marginBottom:'15px',borderColor: 'cyan' }} />
                            <Link to={{
        pathname: '/profile',
        state: { email: emails } // Pass the email as part of the state
    }} style={{ paddingTop: '440px', textDecoration: 'none', color: 'white' }}>Profile</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px',borderColor: 'cyan' }} />
                        </div>
                        <div style={{ color: 'white' }}>
                            <Link to="/profile" style={{ paddingTop: '440px',textDecoration: 'none', color: 'white' }}>Exams</Link>
                            <hr style={{ width: '98%', marginTop: '15px',marginBottom:'15px', borderColor: 'cyan' }} />
                        </div>
                        <div style={{ color: 'white' }}>
                            <Link to="/profile" style={{ paddingTop: '440px',textDecoration: 'none', color: 'white' }}>
                                Fee payment</Link>
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
                <div className='hello'>
                {deps.map((stu) => (
                        <h2>Hello, {stu.fname}!</h2>
                    ))}
                </div>
                <div className='grid'>
                    <div className='prof-card'>
                        <img src='/images.png' height={'50px'} widdth={'50px'} alt="profile_image" 
                        style={{marginLeft:'30px',marginTop:'20px'}}/>
                        <p style={{position:'absolute',top:'30px' , left:'25%'}}>{deps.map((stu) => (
                        <h3>{stu.fname} {stu.lname}</h3>
                        ))}</p>
                    <div style={{position:'absolute',top:'35%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h5>USN: {stu.universityid}</h5>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'45%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h5>Email-ID: {stu.email}</h5>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'55%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h5>Department: {stu.department}</h5>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'65%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h5>Year: {stu.year}</h5>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'75%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h5>Contact: {stu.phnumber}</h5>
                        ))}</p>
                    </div>
                    
                    </div>
                    <div className='Attend'>
                        <div>
                            <p><br></br>{deps.map((stu) => (
                            <h2>{stu.attendance}%</h2>
                            ))}</p>
                        </div>
                        <div style={{marginTop:'0px'}}>
                            <h2>Attendence</h2>
                        </div>

                    </div>
                    <div className='Tasks'>
                        <div>
                            <p><br></br>
                            <h2>Nil</h2></p>
                        </div>
                        <div style={{marginTop:'0px'}}>
                            <h2>Current Tasks</h2>
                        </div>
                    </div>
                    
                    <div className='Result'>
                        <div>
                            <p><br></br>{deps.map((stu) => (
                            <h2>{stu.examresult}</h2>
                            ))}</p>
                        </div>
                        <div style={{marginTop:'0px'}}>
                            <h2>Result</h2>
                        </div>
                    </div>

                    <div className='bulletin'>
                    <div style={{marginTop:'-10px'}}>
                            <h2><br></br>Fees</h2>
                        </div>
                        <div>
                            <p>{deps.map((stu) => (
                            <h2>Instalment-1: ${stu.feesamount}</h2>
                            ))}</p>
                        </div>
                        <div>
                        <p>
                            {deps.map((stu) => (
                            <h2>Status: {stu.feesstatus === 1 ? 'Paid' : 'Not Paid'}</h2>
                        ))}
                        </p>
                        <hr style={{ width: '98%',marginBottom:'15px',borderColor: '#C0C0C0' }} />
                    </div>
                    <div>
                            <p>{deps.map((stu) => (
                            <h2>Instalment-2: ${stu.feesamount}</h2>
                            ))}</p>
                        </div>
                        <div>
                        <p>
                            {deps.map((stu) => (
                            <h2>Status: {stu.feesstatus === 1 ? 'Paid' : 'Not Paid'}</h2>
                        ))}
                        </p>
                    </div>
                    </div>
                    <div className='CTasks'>
                        <div>
                            <p>
                            <h2>Schedule For The Week</h2></p>
                        </div>
                        <div style={{marginTop:'-20px'}}>
                            <div className='week'>
                                <h2>Day 1</h2>
                            </div>
                            <div className='week' style={{left:'22%'}}>
                            <h2>Day 2</h2>
                            </div>
                            <div className='week' style={{left:'41%'}}>
                            <h2>Day 3</h2>
                            </div>
                            <div className='week' style={{left:'61%'}}>
                            <h2>Day 4</h2>
                            </div>
                            <div className='week' style={{left:'81%'}}>
                            <h2>Day 5</h2>
                            </div>
                        </div>
                    </div>
                </div>
            

              <div className='foot'>
                <br></br>
                &copy; 2024 Student Management System
              </div>
            </div>
        </div>
    );
};

export default Homepage;


