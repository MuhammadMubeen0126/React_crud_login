import React from 'react'
import { useState } from 'react';
import axios from 'axios';


const Login = () => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const postData = async (e) => {
        e.preventDefault();
        const {email, password} = e.target.elements;
        const response = await axios.post("http://localhost:5000/login", {
            email: email.value,
            password: password.value
        });
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            return window.location.href = "/home";
        }
    };
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={postData}>
            <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>


    </div>
  )
}

export default Login