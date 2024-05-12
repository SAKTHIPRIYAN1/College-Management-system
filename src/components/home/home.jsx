import './home.css';
import { useEffect,useState,useRef } from 'react';
import { easeIn, motion,useAnimation,useInView } from 'framer-motion';


import img1 from '../img/caro1.jpeg';
import img2 from '../img/caro2.jpeg';
import img3 from '../img/caro3.jpeg';
import img4 from '../img/caro4.jpeg';
import img5 from '../img/caro5.jpeg';
import img6 from '../img/caro6.jpeg';
import img7 from '../img/caro7.jpeg';
import img8 from '../img/caro8.jpeg';


import mn  from '../img/mnn.png'

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


export default Home;