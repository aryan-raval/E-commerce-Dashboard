import React, { useState ,useEffect} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const user=localStorage.getItem('user');
        if(user){
            navigate('/')
        }
    },[])

    const handleLogin = async () => {
        let result=await axios.post('http://localhost:5002/login',{email,password});
        // console.warn(result.data.user.name)
       if(result.data.user.name){
            localStorage.setItem('user',JSON.stringify(result.data.user));
            localStorage.setItem('token',JSON.stringify(result.data.auth))
            navigate('/');
        }else{
            alert('please enter correct details...')
        }
    }


 
    return (
        <div className="login">
            <h1>Login Here</h1>

         

            <input type="text" placeholder="enter email" className="inputBox"
                value={email} onChange={(e) => { setEmail(e.target.value) }} />

            <input type="password" placeholder="enter password" className="inputBox"
                value={password} onChange={(e) => { setPassword(e.target.value) }} />

            <button className="appButton" onClick={handleLogin}>login</button>
        </div>
    )
}

export default Login;