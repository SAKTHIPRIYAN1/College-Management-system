import './login.css';
import axios from 'axios'
import { useState,useEffect } from 'react';
const Loginpage=()=>{
    return(
        <div className="login">
            <AdministorLogin />
        </div>
    )
}

const AdministorLogin=()=>{
    let [name,setname]=useState("");
    let [password,setpassword]=useState("");
    const handleclick = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5174/login', { name, password });
          console.log(response.data);
        } catch (error) {
            console.log(error)
        }
      };
    return(
        <div className="adminlog">
                <form onSubmit={handleclick} className='form'>
                <label htmlFor="username">AdminId:</label>
                    <input type="text" id="adminid" name="adminid" onChange={(e)=>{setname(e.target.value)}} required/>
                <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e)=>{setpassword(e.target.value)}} required/>
                    <button type="submit">Login</button>
                </form>
        </div>
    );
}

export default Loginpage;