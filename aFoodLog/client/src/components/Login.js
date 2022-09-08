import React, {useState} from 'react'

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(userEmail, userPassword)
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Enter Email</label>
                <input type = 'text' value = {userEmail} 
                onChange={(e)=>setUserEmail(e.target.value)}/>
                <label>Enter Password</label>
                <input type = 'password' value = {userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;