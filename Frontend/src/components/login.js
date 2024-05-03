import { useState } from "react";
import { auth, googleProvider } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    console.log(auth?.currentUser?.email);
    const navigate = useNavigate();

    const handleSignClick = () => {
        navigate('/home', { state: { email: email } });
    };
    
    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setLoggedIn(true);
        } catch (err) {
            alert("User already exists!");
            console.log(err);
        }
    };

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoggedIn(true);
            handleSignClick();
        } catch (err) {
            var errorCode = err.code;
            var errorMessage = err.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }

            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setLoggedIn(true);
            handleSignClick();
        } catch (err) {
            console.error(err);
        }
    };

    const signout = async () => {
        try {
            await signOut(auth);
            setLoggedIn(false);
        } catch (err) {
            console.error(err);
        }
    };
    const redirectToRegistration = () => {
        navigate('/admin')
    };

    return (
        <div className="body-login">
            <div className="boxs">
                    <div className="loginText">
                        Login
                    </div>
                    <div className="content">
                        <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name="email" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <div className="action-buttons">
                            <button onClick={signIn}>Sign In</button>
                            <button onClick={signInWithGoogle}>Sign In with Google</button>
                        </div>
                        <div className="register-link" onClick={redirectToRegistration}>
                            Not a Student? Login in as Admin
                        </div>
                    </div>
                </div>
            {loggedIn && <button onClick={signout} style={{position:'absolute',left:'1350px',top:'0.5px',width: '100px',padding: '8px',borderRadius: '10px',background: '#ffffffc3'}}>Sign out</button>}
        </div>
    );
};

export default Login;
