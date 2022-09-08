import React from 'react'

const Register = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    

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
                <input type = 'password' value = {userPassword}
                onChange={(e)=>setUserPassword(e.target.value)}/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Register