import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Register = (props) => {
    const {setSuccessMsg} = props;
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(()=> {
        setSuccessMsg('')
    },[])

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
            setErrors(err.response.data.errors)
        }
    }
    

    return (
        <div className='container'>
            <div className='row'>
                <div className='border border-dark rounded mx-auto my-4 p-3 column col-10 col-sm-8 col-md-6 col-lg-6'>
                    <h1>Register New User</h1>
                    <form onSubmit={handleRegister} className='d-flex flex-column mx-auto w-50'>
                        <div className='m-3'>
                            <label className='mx-4'>Enter Email</label>
                            <input type = 'text' value = {userEmail} 
                            onChange={(e)=>setUserEmail(e.target.value)}/>
                        </div>
                        <div className='m-3'>
                            <label className='mx-3'>Enter Password</label>
                            <input type = 'password' value = {userPassword}
                            onChange={(e)=>setUserPassword(e.target.value)}/>
                        </div>
                        <div className='m-3'>
                            <label className='mx-2'>Confirm Password</label>
                            <input type = 'password' value = {confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button className='btn btn-warning'>Register</button>
                        </div>
                    </form>
                    {
                        errors.email ? 
                        <p className='errColor my-3'>{errors.email.message}</p>: null
                    }
                    {
                        errors.message ? 
                        <p className='errColor my-3'>{errors.message}</p>: null
                    }
                    {
                        errors.confirmPassword ? 
                        <p className='errColor my-3'>{errors.confirmPassword.message}</p>: null
                    }
                    <div className='mt-3'>

                        <Link to='/foodlog/login'>Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;