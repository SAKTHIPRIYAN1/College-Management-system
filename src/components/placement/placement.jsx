import './placement.css';
import plimg from '../img/slider_kp.jpg'
import patt from '../img/patt.png'

import pl1 from '../img/nvd2.jpeg'
import pl5 from '../img/mic.jpeg'
import pl2 from '../img/ggl2.jpeg'
import pl4 from '../img/ARC.png'
import pl3 from '../img/app2.jpeg'
import pl6 from '../img/BNY.png'

import { useEffect, useState,useRef } from 'react';
import { easeIn, motion,useAnimation,useInView } from 'framer-motion';
import axios from 'axios';

const Placement=()=>{
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    }, [location.pathname]);
    return(
        <div className="pl">
        <Transparent />
        <PlacDet />
        <Companies />
        <PlacementRep />
        </div>
    )
}

const Transparent=()=>{
    const trref = useRef(null);
    let trvw = useInView(trref);
    const trctrl = useAnimation();

    useEffect(() => {
        if (trvw)
            trctrl.start("animate");
    }, [trvw]);
    return(
        <div className="transCont" ref={trref}>
            <motion.img className='kpimg' src={plimg} alt="loading" 
                     variants={{
                        initial: { opacity: 0,},
                        animate: { opacity: 0.6, }
                    }}
                    initial="initial"
                    animate={trctrl}
                    transition={{ duration: 0.1, delay: 0.2 }}
            />
            <motion.h1 className='trpl'
                     variants={{
                        initial: { opacity: 0, x: -100 },
                        animate: { opacity: 1, x: 0 }
                    }}
                    initial="initial"
                    animate={trctrl}
                    transition={{ duration: 0.1, delay: 0.2 }}
            >Placement</motion.h1>
        </div>
    )
}

const PlacDet=()=>{
    const pldref = useRef(null);
    let pldvw = useInView(pldref);
    const pldctrl = useAnimation();

    useEffect(() => {
        if (pldvw)
            pldctrl.start("animate");
    }, [pldvw]);
    return(
        <div className="placdetcon">
            <motion.div className="placdet"
                 variants={{
                    initial: { opacity: 0, x: -100 },
                    animate: { opacity: 1, x: 0 }
                }}
                initial="initial"
                animate={pldctrl}
                transition={{ duration: 0.4, delay: 0.2,  ease:'easeIn'}}
            >
                <h1 className='hgh' >Highlights of the year 2023</h1>
                <p>Highest Offer of the Year : <span className='plb' >40 LPA</span></p>
                <p>Second ighest Offer of the 2023 : <span className='plb' >35.6 LPA</span></p>
                <p>Average Salary of 2023 : <span className='plb' >16 LPA</span></p>
                <p>No of offers over 20 LPA in 2023 : <span className='plb' >97</span></p>
                <p>No of offers : <span className='plb' >1317</span></p>
            </motion.div>
            <motion.div className="plgr"
                 variants={{
                    initial: { opacity: 1,scale:0.8},
                    animate: { opacity: 1,scale:1.0}
                }}
                initial="initial"
                animate={pldctrl}
                transition={{ duration: 0.4, delay: 0.2 }}
            ></motion.div>
            <motion.img className='patt' src={patt} alt="altt"
                 variants={{
                    initial: { opacity: 0,rotate:"90deg"},
                    animate: { opacity: 1,rotate:"90deg"}
                }}
                initial="initial"
                animate={pldctrl}
                transition={{ duration: 0.4, delay: 0.2 }}
            />
             <button className='plrp head_butt' ref={pldref}>Placement Report</button>
        </div>
    )
}
    const Companies = () => {
    const cmpref = useRef(null);
    let cmpvw = useInView(cmpref);
    const cmpctrl = useAnimation();
    useEffect(() => {
        if (cmpvw)
            cmpctrl.start("animate");
    }, [cmpvw]);

    let samp = [
        {
            imge: pl1,
            name: "Nvidia Corporation",
        },
        {
            imge: pl2,
            name: "Google LLC",
        },
        {
            imge: pl3,
            name: "Apple Inc",
        },
        {
            imge: pl4,
            name: "Arcesium",
        },
        {
            imge: pl5,
            name: "Microsoft Corpor",
        },
        {
            imge: pl6,
            name: "BNY Melon",
        }
    ];

    function selectThreeElements(array) {
        const selectedGroups = [];
        for (let i = 0; i < array.length; i += 3) {
            const group = array.slice(i, i + 3);
            selectedGroups.push(group);
        }
        return selectedGroups;
    }

    let rscomp = selectThreeElements(samp);
    console.log(rscomp)
    return (
        <div className='comp'>
            {rscomp.map((el, index) => ( // Added 'return' statement here
                <Plblock key={index} nam={el} in={index}  /> // Added 'key' prop here
            ))}
            <motion.h2 
                        variants={{
                            initial: { opacity: 0, x:100},
                            animate: { opacity: 1,x:0 }
                        }}
                        initial="initial"
                        animate={cmpctrl}
                        transition={{ duration: 0.4, delay: 0.4}} 
            ref={cmpref}  className='ovr'>Over <span className='clr'>200+</span> companies , record number of <span className='clr' >Recruiters</span> </motion.h2>
        </div>
    );
};

const Plblock = (props) => {
    const cmpref = useRef(null);
    let cmpvw = useInView(cmpref);
    const cmpctrl = useAnimation();
    useEffect(() => {
        if (cmpvw)
            cmpctrl.start("animate");
    }, [cmpvw]);
    let comdets = props.nam;
    // let re=props.ref;
    console.log(comdets)
    return (
        <motion.div className='plblcon'
        variants={{
            initial: { opacity: 0, x:100},
            animate: { opacity: 1,x:0 }
        }}
        initial="initial"
        animate={cmpctrl}
        transition={{ duration: 0.4, delay: 0.4*props.in }} 
        >
            {comdets.map((company, index) => (
                <div className="blcomp" key={index} ref={cmpref}  
                
                >
                    <img src={company.imge} className='blimg' alt={company.name} />
                    <h2>{company.name}</h2>
                </div>
            ))}
        </motion.div>
    );
};

const PlacementRep=()=>{
    return(
        <>
        <h1 id='plr' >
            Placement Report
        </h1>

        <PlacementTab />

        <h1 id='plr' >
            Overall Report
        </h1>

        <Report />
        </>
        
    )
}

const PlacementTab = () => {
    const [year, setYear] = useState('');
    const [department, setDepartment] = useState('CSE');
    const [tableData, setTableData] = useState([]);

    const handleYearChange = (e) => {
       setYear(e.target.value)
        console.log(year);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
                try {
                    console.log(year)
                    const response = await axios.post('http://localhost:3000/general/placements',{year,department});
                    setTableData(response.data);
                    console.log(response.data);
                } catch (err) {
                    console.log('Error fetching data', err);
                }
            
        };
        fetchData();
    }, [year, department]);

    return (
        <div className="plTab">
            
                <div className='flx_ch'>
                    <div className=" sidiv" >
                    <label htmlFor="year">Year:</label>
                    <select id="year" value={year} onChange={handleYearChange}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
         
                    </select>
                    </div>
                
                <div className=" sidiv" style={{marginLeft:"20px"}}>
                    <label htmlFor="department">Department:</label>
                    <select id="department" value={department} onChange={handleDepartmentChange}>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="MECH">MECH</option>
                      
                    </select>
                </div>
                </div>
           

            {tableData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th style={{borderRight:'none'}}>Package</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.company}</td>
                                <td>{row.position}</td>
                                <td style={{borderRight:'none'}}>{row.salary}</td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
const Report=()=>{
    const [departmentSalaries, setDepartmentSalaries] = useState([]);

    useEffect(() => {
        const fetchDepartmentSalaries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/general/department_salaries');
                setDepartmentSalaries(response.data);
            } catch (error) {
                console.log('Error fetching department salaries:', error);
            }
        };

        fetchDepartmentSalaries();
    }, []);

    return (
        <table style={{marginBottom:'20px'}}>
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Average Salary</th>
                </tr>
            </thead>
            <tbody>
                {departmentSalaries.map((department, index) => (
                    <tr key={index}>
                        <td>{department.department}</td>
                        <td>{department.avg_salary+" LPA"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default Placement;