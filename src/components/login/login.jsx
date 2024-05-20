import './login.css';
import axios from 'axios';
import img from '../img/lg.jpg';
import { useState,useRef, useEffect } from 'react';
import { animate, motion,useAnimation,useInView } from 'framer-motion';
import { easeIn } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



const Loginpage = () => {
    let [choice, setChoice] = useState('Admin');
    let changeLog = (e) => {
        setChoice(e.target.value);
    };
    return (
        <div className="login">
            <div className="logch">
                <h2 className='chh1'>Choice :</h2>
                <select name="choice" id="ch" onChange={changeLog}>
                    <option value="Admin">Admin</option>
                    <option value="Alumni">Alumni</option>
                </select>
            </div>
            
            {choice === 'Admin' && <AdministorLogin />}
            {choice === 'Alumni' && <AlumniLogin />}
        </div>
    );
};

const AdministorLogin = () => {
    let [adminId, setAdminId] = useState("");
    let [adminPassword, setAdminPassword] = useState("");
    let [errmsg, seterrmsg] = useState("");

    const navigate = useNavigate();
    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login/admin', { id: adminId, password: adminPassword });
            console.log(response.data);
            seterrmsg('');
            localStorage.setItem('token', response.data.token);
            navigate('/adminDash');
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                seterrmsg(error.response.data.msg);
            }
            else if (error.request) {
                // The request was made but no response was received
                console.log('Error request data:', error.request);
                seterrmsg(error.request.data.msg);
            }
            else{
                console.log('server error');
                seterrmsg("server error :500 ");
            }
        }
    };

    let adminref=useRef(null);
    let adminvw=useInView(adminref);
    let adctrl=useAnimation();

    useEffect(()=>{
        if(adminvw)
            adctrl.start('animate');
    },[adminvw])
    return (
        <motion.div className="adminlog" ref={adminref}
            variants={
                {
                    initial:{  opacity: 0, x: -100 },
                    animate:{opacity:1,x:0}
                }
            }
            initial='initial'
            animate={adctrl}
            transition={{ duration: 0.2, delay: 0.1 ,ease:easeIn}}
        >      
            <div className="adform">
                <img className='lgim' src={img} alt="" />
                <form onSubmit={handleClick} className='form'>
                    <h1 className='h1'>Welcome</h1>
                    <p className='logp'>Login to continue to admin page</p>
                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="adminId">Admin ID</label>
                        <input type="text" id="adminId" placeholder='Your admin ID' name="adminId" onChange={(e) => setAdminId(e.target.value)} required/>
                    </div>
                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="adminPassword">Password</label>
                        <input type="password" id="adminPassword" placeholder='Your password' name="adminPassword" onChange={(e) => setAdminPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className='head_butt bg'>Login</button>
                    <label className='fgpwd'>Forgot password? <span className='clkhr' style={{fontWeight:'bold'}}>Click here</span></label>
                    <p className='errmsg'>{errmsg}</p>
                </form>
            </div>
        </motion.div>
    );
};

const AlumniLogin = () => {
    const navigate = useNavigate();
    let [alumniId, setAlumniId] = useState("");
    let [alumniPassword, setAlumniPassword] = useState("");
    let [alerr, seterrmsg] = useState("");

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login/alumini', { regno: alumniId, password: alumniPassword });
            console.log(response.data);
            seterrmsg('');
            localStorage.setItem('token', response.data.token);
            navigate('/aluminiDash');

        }catch (error) {
            if (error.response) {
                console.log(error.response.data);
                seterrmsg(error.response.data.msg);
            }
            else if (error.request) {
                // The request was made but no response was received
                console.log('Error request data:', error.request);
                seterrmsg(error.request);
            }
            else{
                console.log('server error');
                seterrmsg("server error :500 ");
            }
        }
    };

    let aluref=useRef(null);
    let aluvw=useInView(aluref);
    let aluctrl=useAnimation();

    useEffect(()=>{
        if(aluvw)
            aluctrl.start('animate');
    },[aluvw])

    const signup=()=>{
        console.log('signup');
        navigate('/loginpage/signup');
    }
    

    return (
        <motion.div className="adminlog"
        ref={aluref}
        variants={
            {
                initial:{  opacity: 0, x: -100 },
                animate:{opacity:1,x:0}
            }
        }
        initial='initial'
        animate={aluctrl}
        transition={{ duration: 0.2, delay: 0.1 ,ease:easeIn}}
        >      
            <div className="adform">
                <img className='lgim' src={img} alt="" />
                <form onSubmit={handleClick} className='form'>
                    <h1 className='h1'>Welcome</h1>
                    <p className='logp'>Login to continue to alumni page</p>
                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="alumniId">Reg NO</label>
                        <input type="text" id="alumniId" placeholder='Your Reg no' name="alumniId" onChange={(e) => setAlumniId(e.target.value)} required/>
                    </div>
                    <div className="frmdiv">
                        <div className="fwddiv">
                            <label className="labelinp" htmlFor="alumniPassword">Password</label>
                            <label><span className='clkhr fgpwdalu' style={{fontWeight:'bold'}}>Forgot password?</span></label>
                        </div>
                        <input type="password" id="alumniPassword" placeholder='Your password' name="alumniPassword" onChange={(e) => setAlumniPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className='head_butt bg'>Login</button>
                    <label className='fgpwd'>Don't have an account? <span className='clkhr' onClick={signup} style={{fontWeight:'bold'}}>Sign up</span></label>
                    <p className='errmsg'>{alerr}</p>
                </form>
            </div>
        </motion.div>
    );
};

export default Loginpage;
