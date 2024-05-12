import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import './alumini.css';

import img from './al1.png';
import evImg from './ev4.jpg';
import pic1 from './alb1.jpg';
import pic2 from './alb2.jpg';
import pic3 from './alb3.jpg';
import pic4 from './alb4.jpg';
import ev1 from './evd1.jpg';
import ev2 from './evd2.jpg';
import ppl1 from './ppl1.jpeg';
import ppl2 from './ppl2.jpeg';
import ppl3 from './ppl3.jpeg';
import ppl4 from './ppl4.jpeg';
import ppl5 from './ppl5.jpeg';
import ppl6 from './ppl6.jpeg';

const Alumini = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    }, [location.pathname]);

    return (
        <section className='alumini_sec'>
            <Transparent />
            <NewsRoom />
            <MemberImages />
            <Blogs />
            <Gallery />
            {/* <AluminiDetSeacrch /> */}
        </section>
    );
};

const Transparent = () => {
    const transRef = useRef(null);
    const transvw = useInView(transRef);
    const transctrl = useAnimation();

    useEffect(() => {
        if (transvw)
            transctrl.start("animate");
    }, [transvw]);

    return (
        <section className='placImgCont' ref={transRef}>
            <motion.img
                className="alImg"
                src={img}
                alt="imm"
                variants={{
                    initial: { opacity: 0, y: 0 },
                    animate: { opacity: 1, y: 0 }
                }}
                initial="initial"
                animate={transctrl}
                transition={{ duration: 0.1, delay: 0.1 }}
            />
            <motion.h1
                className='al_txt'
                variants={{
                    initial: { opacity: 0, x: -100 },
                    animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate={transctrl}
                transition={{ duration: 0.1, delay: 0.3 }}
            >
                ALUMNI RELATIONS
            </motion.h1>
        </section>
    );
};

const NewsRoom = () => {
    const transRef = useRef(null);
    const transvw = useInView(transRef);
    const transctrl = useAnimation();

    useEffect(() => {
        if (transvw)
            transctrl.start("animate");
    }, [transvw]);

    const evcont = [
        {
            topic: "Distinguished Alumni Awardees 2024",
            des: "Dear MembersWe take pleasure in announcing the Distinguished alumni Awards - 2024 and the list of awardees is attached herewith. We thank the Distinguished alumni Awards Committee members for their excellent work of evaluating the Applications forms and selecting the..."
        },
        {
            topic: "Alumni Day 2024",
            des: "Dear Alumni Members,Enclosing herewith are the invitations 1 & 2 for the morning and evening sessions of the Alumni day- 2024 celebrations to be held on 13th April 2024 at Vivek Audi, CEG campus"
        }
    ];

    return (
        <div className='NewsRoomcont'>
            <div className="gradi"></div>
            <h1 className='nrm'>NEWSROOM</h1>
            <div className="ev_divCon">
                {evcont.map((el, ind) => (
                    <motion.div
                        className="el_div"
                        key={ind}
                        variants={{
                            initial: { opacity: 0, y: 50 },
                            animate: { opacity: 1, y: 0 }
                        }}
                        initial="initial"
                        animate={transctrl}
                        transition={{ duration: 0.3, delay: 0.4 * ind + 1 }}
                    >
                        <img src={evImg} style={{ maxHeight: '160px' }} alt="loadingg..." className="evImg" />
                        <div className="el_com_div">
                            <h2 className='ev_tp'>{el.topic}</h2>
                            <p className='ev_des'>{el.des}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const MemberImages = () => {
    const transRef = useRef(null);
    const transvw = useInView(transRef);
    const transctrl = useAnimation();

    useEffect(() => {
        if (transvw)
            transctrl.start("animate");
    }, [transvw]);

    const imDiv = [pic1, pic2, pic3, pic4];

    return (
        <div className="picDiv" ref={transRef}>
            {imDiv.map((el, ind) => (
                <motion.img
                    className='ic_img'
                    key={ind}
                    src={el}
                    alt="loading.."
                    variants={{
                        initial: { opacity: 0, x: -60 },
                        animate: { opacity: 1, x: 0 }
                    }}
                    initial="initial"
                    animate={transctrl}
                    transition={{ duration: 0.5, delay: 0.4 * ind + 1 }}
                />
            ))}
        </div>
    );
};

const Blogs = () => {
    const transRef = useRef(null);
    const transvw = useInView(transRef);
    const transctrl = useAnimation();

    useEffect(() => {
        if (transvw)
            transctrl.start("animate");
    }, [transvw]);

    const events_alumini = [
        {
            date: '3 Nov 2022',
            title: 'Career Guidance Program for Mechanical Engineering Students',
            lnk: 'https://www.aaceg.org/newsroom/news/Career-Guidance-Program-for-Mechanical-Engineering-Students.dz'
        },
        {
            date: '12 Jul 2022',
            title: 'Muthamizh Vizha',
            lnk: 'https://www.aaceg.org/newsroom/news/Muthamizh-Vizha.dz'
        },
        {
            date: '19 Jun 2022',
            title: 'Genesis Day 2022',
            lnk: 'https://www.aaceg.org/newsroom/news/Genesis-Day-2022.dz'
        },
        {
            date: '4 May 2022',
            title: 'AACEG Web Portal Guidelines',
            lnk: 'https://www.aaceg.org/newsroom/news/AACEG-Web-Portal-Guidelines.dz'
        },
        {
            date: '1 Jul 2022',
            title: 'Student User - Quick links',
            lnk: 'https://www.aaceg.org/newsroom/news/Student-User---Quick-Links-to-Navigate-the-Web-Portal.dz'
        }
    ];

    return (
        <div className='blogsCon'>
            <h1 className='nrm'>BLOGS</h1>
            <motion.div
                className="evvdet"
                variants={{
                    initial: { opacity: 0, x: -60 },
                    animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate={transctrl}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                {events_alumini.map((el, ind) => (
                    <div className="evdes" key={ind} ref={transRef}>
                        <a href={el.lnk} className='evtit'>{el.title}</a>
                        <p className='evtym'>{el.date}</p>
                    </div>
                ))}
            </motion.div>
            <div className="gradi plgradi"></div>
            <motion.div
                className="eventpics"
                variants={{
                    initial: { opacity: 0, x: +60 },
                    animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate={transctrl}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                <a href="https://www.aaceg.org/user/login.dz"><img className='evp' src={ev1} alt="loadingg..." /></a>
                <img src={ev2} className='evp' alt="loadingg..." />
            </motion.div>
        </div>
    );
};

const Gallery = () => {
    const transRef = useRef(null);
    const transvw = useInView(transRef);
    const transctrl = useAnimation();

    useEffect(() => {
        if (transvw)
            transctrl.start("animate");
    }, [transvw]);

    const imDiv = [ppl1, ppl2, ppl3, ppl4, ppl5, ppl6];

    return (
        <div className="algallry">
            <h1 className='nrm'>Gallery</h1>
            <motion.div
                className="al_gal_img"
                ref={transRef}
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 }
                }}
                initial="initial"
                animate={transctrl}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                {imDiv.map((el, ind) => (
                    <img className='al_img' key={ind} src={el} alt="loading.." />
                ))}
            </motion.div>
        </div>
    );
};

export default Alumini;
