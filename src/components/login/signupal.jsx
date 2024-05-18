import './login.css';
import axios from 'axios';
import img from '../img/lg.jpg';
import { useState,useRef, useEffect } from 'react';
import { animate, motion,useAnimation,useInView } from 'framer-motion';
import { easeIn } from 'framer-motion';





const Signup=()=>{
    
    return(
        <div className="signup">
            <div className="form">
                <form>
                <label htmlFor="name">name</label>
                <input type="text"placeholder='Your name' />

                <label htmlFor="regno">Reg no</label>
                <input type="text" placeholder='Your regno' />

                <label htmlFor="eamil">E-mail</label>
                <input type="email" name="email" id=""  placeholder='Your email'/>

                <label htmlFor="Department">Department</label>
                <select name="dep" id="">
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="EEE">EEE</option>
                    <option value="EEE">CIVIL</option>
                </select>

                <label htmlFor="year_of_passing">Year of Passing</label>
                <input type="text" placeholder='Year of Passing out' />

                </form>
            </div>
        </div>
    )
}

export default Signup;