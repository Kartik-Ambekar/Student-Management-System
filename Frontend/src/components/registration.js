import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from "react-router-dom";
import './login.css';

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User registered successfully!");
            navigate("/homepage");
            console.log(name);
        } catch (err) {
            alert("Registration failed!");
            console.error(err);
        }
    };

    return (
        <div className='body-login'>
        <div className="container">
            <div className="boxs">
                <div className="loginText">Register Now</div>
                <div className="content">
                    <div>
                    <input type="text" name = "name" placeholder='First Name' onChange={(e) => setName(e.target.value)}/>
                    <input type="text" name = "name" placeholder='Last Name' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    
                    <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <div className="action-buttons">
                        <button onClick={signUp}>Register</button>
                    </div>
                    <div className="register-link">
                        <Link to="/">Already have an account? Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Registration;
