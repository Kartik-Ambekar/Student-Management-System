import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import './home.css';
import { auth, googleProvider } from './firebase.js';
import { signOut } from 'firebase/auth';
import { db } from './firebase.js';
import { getDocs,collection } from "firebase/firestore";
import { useLocation } from 'react-router-dom';

const Profile = ({ email }) => {
    const location = useLocation();
    const emails = location.state?.email;
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
        navigate('/profile');
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
                        style={{ position: 'relative', left: '670px', top: '15px', width: '100px', padding: '8px', borderRadius: '10px',borderColor:'transparent',color:'white', background: '#363740' }}>
                        Sign out
                    </button>
                </div>

                <div className='optionmenu'>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h2 style={{marginBottom:'25px'}}>Student</h2>
                        <div style={{ color: 'white' }}>
                        <hr style={{ width: '98%',marginBottom:'15px',borderColor: 'cyan' }} />
                            <Link to="/home" style={{ paddingTop: '440px',textDecoration: 'none', color: 'white' }}>Profile</Link>
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
                            <Link to="/profile" style={{ marginTop:'500px',textDecoration: 'none', color: 'white' }}>Settings</Link>
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
                        <img src='/images.png' height={'50px'} widdth={'50px'} alt="profile_image" style={{marginLeft:'30px',marginTop:'20px'}}/>
                        <p style={{position:'absolute',top:'0px' , left:'25%'}}>{deps.map((stu) => (
                        <h2>{stu.fname} {stu.lname}</h2>
                        ))}</p>
                    <div style={{position:'absolute',top:'30%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h4>USN: {stu.universityid}</h4>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'40%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h4>Email-ID: {stu.email}</h4>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'50%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h4>Department: {stu.department}</h4>
                        ))}</p>
                    </div>
                    <div style={{position:'absolute',top:'60%' , left:'5%'}}>
                        <p>{deps.map((stu) => (
                        <h4>Year: {stu.year}</h4>
                        ))}</p>
                    </div>
                    </div>
                    <div className='Attend'>
                        <div>
                            <p>{deps.map((stu) => (
                            <h2>{stu.attendance}%</h2>
                            ))}</p>
                        </div>
                        <div style={{marginTop:'-20px'}}>
                            <h2>Attendence</h2>
                        </div>

                    </div>
                    <div className='Tasks'>
                        <div>
                            <p>
                            <h2>Nil</h2></p>
                        </div>
                        <div style={{marginTop:'-20px'}}>
                            <h2>Current Tasks</h2>
                        </div>
                    </div>
                    <div className='bulletin'>
                            <h3>BULLETIN BOARD</h3>
                            <div className='week1'>
                                <h2>..... ..... .....</h2>
                                <h2>..... ..... .....</h2>
                                
            
                            </div>
                    </div>

                    <div className='CTasks'>
                        <div>
                            <p>
                            <h2>Schedule For The Week</h2></p>
                        </div>
                        <div style={{marginTop:'-20px'}}>
                            <div className='week'>
                                <h3>Day 1</h3>
                            </div>
                            <div className='week' style={{left:'22%'}}>
                            <h3>Day 2</h3>
                            </div>
                            <div className='week' style={{left:'41%'}}>
                            <h3>Day 3</h3>
                            </div>
                            <div className='week' style={{left:'61%'}}>
                            <h3>Day 4</h3>
                            </div>
                            <div className='week' style={{left:'81%'}}>
                            <h3>Day 5</h3>
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

export default Profile;