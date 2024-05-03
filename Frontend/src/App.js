import React from 'react';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import Home from './components/home.js';
import Login from './components/login.js';
import Registration from './components/registration.js';
import Profile from './components/profile.js';
import Settings from './components/settings.js';
import Student from './components/adminStudent.js';
import AdminLogin from './components/adminLogin.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path= "/register" element={<Registration/>}/>
                <Route path="/settings" element = {<Settings/>} />
                <Route path="/admin" element = {<AdminLogin/>} />
                <Route path = "/adminpage" element = {<Student/>}/>
            </Routes>
        </Router>
    );
};
export default App;




