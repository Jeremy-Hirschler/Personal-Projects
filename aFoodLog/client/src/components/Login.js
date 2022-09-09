import axios from 'axios';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [err, setErr] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const postData = {email: userEmail, password: userPassword}
        console.log(userEmail, userPassword)
        axios.post('http://localhost:8000/api/login', postData, {
            withCredentials: true
        })
        .then((res)=> {
            console.log(res)
            navigate('/foodlog/home')
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    // const handleLogout = () => {
    //     axios.get('http://localhost:8000/api/logout')
    //     .then((res)=> {
    //         console.log(res)
    //     })
    //     .catch((err)=> {
    //         console.log(err)
    //     })
    // }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Enter Email</label>
                <input type = 'text' value = {userEmail} 
                onChange={(e)=>setUserEmail(e.target.value)}/>
                <label>Enter Password</label>
                <input type = 'password' value = {userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}/>
                <button onClick={handleLogin}>Login</button>
            </form>
            <Link to='/foodlog/register'>Don't have an account? Sign up for free</Link>
        </div>
    )
}

export default Login;