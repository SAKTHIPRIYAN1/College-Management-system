import './home.css';
import { useEffect,useState,useRef } from 'react';
import { easeIn, motion,useAnimation,useInView,AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


import img1 from '../img/caro1.jpeg';
import img2 from '../img/caro2.jpeg';
import img3 from '../img/caro3.jpeg';
import img4 from '../img/caro4.jpeg';
import img5 from '../img/caro5.jpeg';
import img6 from '../img/caro6.jpeg';
import img7 from '../img/caro7.jpeg';
import img8 from '../img/caro8.jpeg';


import mn  from '../img/mnn.png'

import axios from 'axios';
// import Head from '../header/header';
const Home=()=>{

    

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    }, [location.pathname]);
     
    return (
        <div className="homeContain">
            <Carosel />
            <CollegeAbout />
             <CegDet />
            <Rank />
        </div>
    )
}

const Carosel=()=>{
    let clss=[
        {
            name:img1,
            cls:'caro1'
        },
        {
            name:img2,
            cls:'caro2'
        },
        {
            name:img3,
            cls:'caro3'
        },
        {
            name:img4,
            cls:'caro4'
        },
        {
            name:img5,
            cls:'caro5'
        },
        {
            name:img6,
            cls:'caro6'
        },
        {
            name:img7,
            cls:'caro7'
        },
        {
            name:img8,
            cls:'caro8'
        },
    ]
    return(
        <div className="caroContain">
            {
                clss.map((el,ind)=>{
                    return(
                        <div className={el.cls + " carodivs"} key={ind}>
                            <img src={el.name} className='caroimg' alt='loadding' />
                        </div>
                    )
                })
            }
        </div>
    )
}

const CollegeAbout=()=>{
    const abref = useRef(null);
    let abvw = useInView(abref);
    const abctrl = useAnimation();

    useEffect(() => {
        if (abvw)
            abctrl.start("animate");
    }, [abvw]);

    return(
        <div className="clgabtCon" ref={abref}
        >
            <div className="gradi hmgr">
            </div>
            <motion.div className="d"
                variants={{
                    initial: { opacity: 0, y: 100 },
                    animate: { opacity: 1, y: 0 }
                }}
                initial="initial"
                animate={abctrl}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
            <h1 className='cg'>College of Engineering Guindy</h1>
            <p className='abt'>
            Located in the heart of Chennai city, 
            the sprawling campus of the College of 
            Engineering, Guindy . The University offers 10 UG
               (Regular), 2 UG(Tamil Medium), 4 UG(Self-Supporting), 3 UG(Part time)
               , 34 PG(Regular), 20 PG(Self-supporting)
             and 3 PG(Part time) courses. 
            </p>

        </motion.div>
        </div>
    )
}
const CegDet=()=>{

    const detref = useRef(null);
    let detvw = useInView(detref);
    const detctrl = useAnimation();

    useEffect(() => {
        if (detvw)
            detctrl.start("animate");
    }, [detvw]);

    return(
        <div className="cegdetcon" >
            <motion.div className="cegimgcon"
                variants={{
                    initial: { opacity: 0, x:-100 },
                    animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate={detctrl}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <img className='cegimg' src={mn} alt="loadingg.." ref={detref}/>
            </motion.div>
            <motion.div className="cegtxt"
                variants={{
                    initial: { opacity: 0, x:100 },
                    animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate={detctrl}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <h1 style={{marginTop:'0px',marginBottom:'10px',color:'white'}}>CEG</h1>
                <p >Anna University is to be a world class 
                    institution by producing professionals with 
                    high technical knowledge, professional skills
                     and ethical values and remain as a preferred
                      partner to the industry and community 
                    for their economic and social development through excellence in teaching, research 
                    and consultancy. Anna University shall be recognized as a point of reference, a catalyst, a facilitator, a trend setter and a leader in technical education.</p>
            </motion.div>
        </div>
    )
}

const Rank=()=>{
    const rkref = useRef(null);
    let rkvw = useInView(rkref);
    const rkctrl = useAnimation();

    useEffect(() => {
        if (rkvw)
            rkctrl.start("animate");
    }, [rkvw]);
    let rnks=[
        '427th in Qs World Ranking',
         '18th in Overall category by NIRF',
         '14th in University category by NIRF',
         '13th in Engineering category by NIRF'
    ]
    return(
        <div className="rankcon" ref={rkref}>
            {
                rnks.map((el,ind)=>{
                   return( 
                   <motion.div style={{display:'grid',placeItems:'center'}} key={ind}
                   variants={{
                    initial: { opacity: 0, x:-50 },
                    animate: { opacity: 1, x:0 }
                }}
                initial="initial"
                animate={rkctrl}
                transition={{ duration: 0.4, delay: 0.2*ind+0.6 }}
                   >
                    <p className="rnk" >{el}</p>
                    </motion.div>
                    )
                })
            }
        </div>
    )
}

// const NewsRoom=()=>{
//     return(
//         <>
//         <h1>
//             Announcements
//         </h1>
//         <News />
//         </>
//     )
// }


// const News = () => {
//     const [news, setNews] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [direction, setDirection] = useState(0); 

//     useEffect(() => {
//         const fetchNews = async () => {
//             try {
//                 let resp = await axios.get('http://localhost:3000/general/home/news');
//                 setNews(resp.data.result);
//             } catch (err) {

//                 console.log('Error occurred');
//                 setNews([]);
//             }
//         };
//         fetchNews();
//     }, []);

//     const handleNext = () => {
//         setDirection(1);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
//     };

//     const handlePrevious = () => {
//         setDirection(-1);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
//     };

//     const variants = {
//         enter: (direction) => ({
//             x: direction > 0 ? 1000 : -1000,
//             opacity: 0
//         }),
//         center: {
//             x: 0,
//             opacity: 1
//         },
//         exit: (direction) => ({
//             x: direction < 0 ? 1000 : -1000,
//             opacity: 0
//         })
//     };

    
    
//     return (
//         <div className="newscontain">
//             {news.length > 0 && (
//                 <div className="carousel">
//                         <motion.div
//                             key={currentIndex}
//                             custom={direction}
//                             variants={variants}
//                             initial="enter"
//                             animate="center"
//                             exit="exit"
//                             transition={{
//                                 x: { type: "spring", stiffness: 300, damping: 30 },
//                                 opacity: { duration: 0.2 }
//                             }}
//                             className="nwBl"
//                         >
//                             <div className="first_bl">
//                                 <h2 className='h1n'>{news[currentIndex].title}</h2>
//                                 <p>{news[currentIndex].date_pub.split('T')[0]}</p>
//                             </div>
//                             <div className="nwsCont">
//                                 {news[currentIndex].content}
//                             </div>
//                         </motion.div>
//                 </div>
//             )}
//             <div className="navigation">
//                 <button onClick={handlePrevious} className="nav-btn head_butt h1">
//                     <div whileTap={{ scale: 0.9 }}>pre</div>
//                 </button>
//                 <button onClick={handleNext} className="nav-btn head_butt h1">
//                     <div whileTap={{ scale: 0.9 }}>next</div>
//                 </button>
//             </div>
//         </div>
//     );
// };


export default Home;
