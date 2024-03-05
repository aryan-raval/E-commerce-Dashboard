import React, { useState ,useEffect} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        let user=localStorage.getItem('user');
        if(user){
            navigate('/')
        }
    },[])

    const handleSignup = async () => {
        let result = await axios.post('http://localhost:5002/signup', { name, email, password });
        // console.warn(result.data.user.name);
        if(result.data.user.name){
            localStorage.setItem('user',JSON.stringify(result.data.user));
            localStorage.setItem('token',JSON.stringify(result.data.auth));
            navigate('/');
        }else{
            console.log("not work from signup.js");
        }
        
    }
    return (
        <div className="register">
            <h1>Register Here</h1>

            <input type="text" placeholder="enter name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder="enter email" className="inputBox"
                value={email} onChange={(e) => { setEmail(e.target.value) }} />

            <input type="password" placeholder="enter password" className="inputBox"
                value={password} onChange={(e) => { setPassword(e.target.value) }} />

            <button className="appButton" onClick={handleSignup}>signup</button>
        </div>
    )
}

export default SignUp;