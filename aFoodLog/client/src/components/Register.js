import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [err, setErr] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const postData = {
            email: userEmail,
            password: userPassword,
            confirmPassword
        };
        try{
            await axios.post('http://localhost:8000/api/register', postData);
            navigate('/foodlog/login');
        }catch(err){
            console.log(err)
            setErr(err.response.data.error)
        }
    }
    

    return (
        <div>
            <form onSubmit={handleRegister}>
                <label>Enter Email</label>
                <input type = 'text' value = {userEmail} 
                onChange={(e)=>setUserEmail(e.target.value)}/>
                <label>Enter Password</label>
                <input type = 'password' value = {userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}/>
                <label>Confirm Password</label>
                <input type = 'password' value = {confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Register