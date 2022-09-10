import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const {successMsg, setSuccessMsg} = props;

    useEffect(()=> {
        setLoginErr('')
    },[])

    const handleLogin = (e) => {
        e.preventDefault();
        setSuccessMsg('');
        const postData = {email: userEmail, password: userPassword}
        console.log(userEmail, userPassword)
        axios.post('http://localhost:8000/api/login', postData, {
            withCredentials: true
        })
        .then((res)=> {
            console.log('response',res)
            console.log(document.cookie)
            navigate('/foodlog/home')
            
        })
        .catch((err)=> {
            console.log(err)
            setLoginErr(err.response.data.error)
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
        <div className='border border-dark rounded mx-auto w-50 my-4 p-3 container'>
            <h1>Food Log Login</h1>
            <form onSubmit={handleLogin} className='d-flex flex-column mx-auto w-50'>
                <div className='m-3'>

                    <label className='mx-3'>Enter Email</label>
                    <input type = 'text' value = {userEmail} 
                    onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
                <div className='m-3'>

                    <label className='mx-2'>Enter Password</label>
                    <input type = 'password' value = {userPassword}
                    onChange={(e)=>setUserPassword(e.target.value)}/>
                </div>
                <div>

                    <button onClick={handleLogin} className='btn btn-warning'>Login</button>
                </div>
            </form>
            {
                successMsg ? 
                <p className='text-warning m-2'>{successMsg}</p>: null
            }
            {
                loginErr ? 
                <p className='errColor m-2'>{loginErr}</p>: null
            }
            <div className='mt-3'>

                <Link to='/foodlog/register'>Don't have an account? Sign up for free</Link>
            </div>
        </div>
    )
}

export default Login;