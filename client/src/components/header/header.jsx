import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../auth';
import './header.css';

const Head = () => {
    const { isLoggedIn, logout,login } = useContext(AuthContext);
    
    const hdref = useRef(null);
    let hdvw = useInView(hdref);
    const hdctrl = useAnimation();

    const [au,setau]=useState(null);


    useEffect(() => {
            let am=sessionStorage.getItem('auth');  
            setau(am);

    }, []);

    // if(au){
    //     login();
    // }

    useEffect(() => {
        if (hdvw) hdctrl.start("animate");
    }, [hdvw]);

    const buttons = [
        { name: 'Home', link: '/' },
        { name: 'Placement', link: '/placement' },
        { name: 'Alumni', link: '/alumni' },
        { name: 'Contact', link: '#contact' },
    ];

    console.log(isLoggedIn,au);

    return (
        <motion.div 
            className="header" 
            ref={hdref}
            variants={{ initial: { opacity: 0, x: 0 }, animate: { opacity: 1, x: 0 } }}
            initial="initial"
            animate={hdctrl}
            transition={{ duration: 0.1, delay: 0.1 }}
        >
            <div className="lap_head">
                <h2>CEG</h2>
                <div className="header_lnks">
                    {buttons.map((el, ind) => (
                        <Butt prp1={el} key={ind} />
                    ))}
                    {(isLoggedIn ) ? (
                        <button onClick={logout} className="head_butt button1">Logout</button>
                    ) : (
                        <NavLink to="/loginpage" className="head_butt button1">Login</NavLink>
                    )}
                </div>
            </div>
            <div className="mbl_head">
                <h3>College of Engineering Guindy</h3>
                <MenuToggle />
                <AdditionalButtons isLoggedIn={isLoggedIn} logout={logout} au={au}/>
            </div>
        </motion.div>
    );
};

const Butt = ({ prp1 }) => {
    const { name, link } = prp1;

    if (name === 'Contact') {
        return <a href={link} className="head_butt">{name}</a>;
    }

    return <NavLink to={link} className="head_butt">{name}</NavLink>;
};

const MenuToggle = ({ width = 24, height = 24, color = 'currentColor', strokeWidth = 2 }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (!isOpen) {
            document.querySelector('.addbutt').classList.add('slide');
        } else {
            document.querySelector('.addbutt').classList.remove('slide');
        }

        setIsOpen(!isOpen);
    };

    return (
        <div onClick={handleClick} className="mnuic">
            {isOpen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            )}
        </div>
    );
};

const AdditionalButtons = ({ isLoggedIn, logout,au }) => {
    return (
        <div className="addbutt">
            <NavLink to="/placement" className="head_butt mbl_butt">Placement</NavLink>
            <NavLink to="/alumni" className="head_butt mbl_butt">Alumni</NavLink>
            <NavLink to="/" className="head_butt mbl_butt">Home</NavLink>
            {isLoggedIn  ? (
                <button onClick={logout} className="head_butt mbl_butt">Logout</button>
            ) : (
                <NavLink to="/loginpage" className="head_butt mbl_butt">Login</NavLink>
            )}
        </div>
    );
};

export default Head;
