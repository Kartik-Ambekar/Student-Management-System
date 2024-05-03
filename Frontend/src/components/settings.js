import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import './home.css';
import { auth, googleProvider } from './firebase.js';
import { signOut } from 'firebase/auth';
import { db } from './firebase.js';
import { getDocs,collection } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import './settings.css';

const Settings= () => {
    const location = useLocation();
    
    const navigate = useNavigate();
    const [Student, setStudent] = useState([]);
    const studentRef = collection(db, "Emails");
    const [deps, setDeps] = useState([]);
    

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
                        style={{ position: 'relative', left: '670px', top: '15px', width: '100px', padding: '8px', borderRadius: '10px',
                        borderColor:'transparent',color:'white', background: '#363740' }}>
                        Sign out
                    </button>
                </div>

                <div className='optionmenu'>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h2 style={{marginBottom:'25px'}}>Student</h2>
                        <div style={{ color: 'white' }}>
                        <hr style={{ width: '98%',marginBottom:'15px',borderColor: 'cyan' }} />
                            <Link to="/profile" style={{ paddingTop: '440px', textDecoration: 'none', color: 'white' }}>Profile</Link>
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
                <div>
                  <h1 style={{position:'absolute',top:'10%',left:'20%'}}>Settings</h1>
                    <div className='settings-container'>
                        <div className='setting-item' style={{top:'25%',left:'30%'}}>
                            <h2>General Settings</h2>
                            <p>Update your general settings here.</p>
          <button>Update</button>
        </div>
        <div className='setting-item' style={{top:'25%',left:'60%'}}>
          <h2>Profile Settings</h2>
          <p>Update your profile settings here.</p>
          <button>Update</button>
        </div>
        <div className='setting-item' style={{top:'55%',left:'30%'}}>
          <h2>Password Settings</h2>
          <p>Change your password here.</p>
          <button>Change Password</button>
        </div>
        <div className='setting-item' style={{top:'55%',left:'60%'}}>
          <h2>Notification Settings</h2>
          <p>Manage your notification preferences here.</p>
          <button>Update</button>
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

export default Settings;