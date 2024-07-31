import './login.css';
import './sgup.css'
import axios from 'axios';
import img from '../img/lg.jpg';
import { useState, useRef, useEffect } from 'react';
import { animate, motion, useAnimation, useInView } from 'framer-motion';
import { easeIn } from 'framer-motion';
import ConfirmPass from './pass';



import { SERVER_URL } from '../../App';
const Signupalu = () => {
    
    const [yearOfPassing, setYearOfPassing] = useState('');
    const [nextStep, setNextStep] = useState('placed');
    const [errmsg,seterrmsg]=useState('');
    const [submit,setsubmit]=useState(false);
    const [formdata,setformdata]=useState({});
    const [errors, setErrors] = useState({});



    // animation
    let sgnref=useRef(null);
    let sgnvw=useInView(sgnref);
    let sgnctrl=useAnimation();

    useEffect(()=>{
        if(sgnvw)
            sgnctrl.start('animate');
    },[sgnvw]);



    const handleYearOfPassingChange = (event) => {
        setYearOfPassing(event.target.value);
    };
  

    const handleNextStepChange = (event) => {
        setNextStep(event.target.value);
    };

    const validateForm = (data) => {
        const { name, regno, email, phoNo, dep, year_of_passing, next_step } = data;
        let errors = {};

        if (!name || !/^[a-zA-Z\s]+$/.test(name)) errors['name'] = 'Name must contain only alphabets';
        if (!regno || !/^\d+$/.test(regno)) errors['regno'] = 'Reg no must be a number';
        if (!phoNo || !/^\d{10}$/.test(phoNo)) errors['phoNo'] = 'Phone number must be exactly 10 digits';
        if (!email || !/\S+@\S+\.\S+/.test(email)) errors['email'] = 'Invalid email';
        if (!dep || !/^[a-zA-Z]+$/.test(dep)) errors['dep'] = 'Department must contain only alphabets';
        if (!year_of_passing || !/^\d{4}$/.test(year_of_passing)) errors['year_of_passing'] = 'Year of passing must be a valid year';
        if (!next_step || !/^[a-zA-Z\s]+$/.test(next_step)) errors['next_step'] = 'Next step must contain only alphabets';

        return errors;
    };

    const isEmptyJSON = (json) => {
        return Object.keys(json).length === 0 && json.constructor === Object;
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        let temp=validateForm(data)
        console.log(temp)
        setErrors(temp);
        if(isEmptyJSON(errors)){
        setsubmit(!submit);
        setformdata(data);
        }
        else{
            console.log(errors);
            seterrmsg('A error in this input.');
        }
        
    };
    if(submit){
        return (
            <motion.div className="signup passcon"
            variants={
                {
                    initial:{  opacity: 0, x: -100 },
                    animate:{opacity:1,x:0}
                }
            }
            initial='initial'
            animate={sgnctrl}
            transition={{ duration: 0.2, delay: 0.1 ,ease:easeIn}}
            >
            <img className='sgim' src={img} alt="" />
                <ConfirmPass data={formdata} />
            </motion.div>
        )
    }
    return (
        <motion.div className="signup" ref={sgnref} 
        
        variants={
            {
                initial:{  opacity: 0, x: -100 },
                animate:{opacity:1,x:0}
            }
        }
        initial='initial'
        animate={sgnctrl}
        transition={{ duration: 0.1, delay: 0.1 ,ease:easeIn}}

        >
            <img className='sgim' src={img} alt="" />
                <h1 className='alh1'>REGISTR FOR ALUMINI</h1>
                <form className='sgnfrm' onSubmit={handleSubmit} >
                    <div className="formsignup">
                    <div className="rhtfrm">
                    <div className="sindiv">
                        <label className='labelinp'  htmlFor="name">Name</label>
                        <input type="text"  className={`sgninp ${errors['name'] ? 'error' : ''}`} name='name'  placeholder='Your name' required />
                    </div>

                    <div className="sindiv">
                        <label className='labelinp'   htmlFor="regno">Reg no</label>
                        <input type="text" className={`sgninp ${errors['regno'] ? 'error' : ''}`} name='regno'  placeholder='Your regno' required/>
                    </div>



                    <div className="sindiv">
                        <label className='labelinp'  htmlFor="email">E-mail</label>
                        <input type="email" className={`sgninp ${errors['email'] ? 'error' : ''}`}  name="email" placeholder='Your email' required/>
                    </div>

                    <div className="sindiv">
                        <label className='labelinp'  htmlFor="phNo">Phone number</label>
                        <input type="text" className={`sgninp ${errors['phNo'] ? 'error' : ''}`}  name="phoNo" placeholder='Your Phno' required/>
                    </div>

                    <div className="sindiv" >
                        <label  className='labelinp' htmlFor="Department">Department</label>
                        <select name="dep" className='sgninp cursor' style={{width:"100%"}} required>
                            
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="MECH">MECH</option>
                            <option value="EEE">EEE</option>
                            <option value="CIVIL">CIVIL</option>
                        </select>
                    </div>

                    </div>
                    <div className="lftfrm">

                    <div className="sindiv">
                        <label    className='labelinp'  htmlFor="year_of_pass">Year of passing</label>
                        <select style={{width:"100%"}} name="year_of_passing" value={yearOfPassing} onChange={handleYearOfPassingChange} className='sgninp cursor' required>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>

                    <div className="sindiv">
                            <label  className='labelinp'  htmlFor="next_step">Next Step</label>
                            <select style={{width:"100%"}} name="next_step" value={nextStep} onChange={handleNextStepChange} className='sgninp cursor' required >
                                <option value="higher">Higher Studies</option>
                                <option value="placed">Placed</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    {nextStep === 'higher' && <Higher />}
                    {nextStep === 'placed' && <Placed />}
                    {nextStep === 'other' && <Other />}
                    </div>

                    </div>
                    <button type="submit" className='head_butt bg sgnrg'>Register</button>
                </form>
                <p className='errmsg'>{errmsg}</p>
        </motion.div>
    );
};


const Higher = () => {
    return (
        <div className="high">
            <div className="sindiv">
                        <label className='labelinp'   htmlFor="Higherclg">College</label>
                        <input type="text" className='sgninp' name='Higherclg'  placeholder='College of higher studies' required/>
            </div>

            <div className="sindiv">
                        <label className='labelinp'   htmlFor="Highercourse">Course</label>
                        <select name="highercouse" style={{width:"100%"}}   className='sgninp cursor' required>
                            <option value="ME">M.E</option>
                            <option value="M.Tech">M.Tech</option>
                            <option value="MBA">MBA</option>
                            <option value="other">other</option>
                        </select>
            </div>

            <div className="sindiv">
                        <label className='labelinp'   htmlFor="Higherspl">Specialization</label>
                        <input type="text" className='sgninp' name='Higherspl'  placeholder='Specialization' required/>
            </div>
            

        </div>
    );
};

const Placed = () => {
    let infos=[
        {
            htmlfor:'placedCompany',
            labelValue:'Company',
            inpType:'text',
            inpPlaceholder:'Your Company'
        },
        {
            htmlfor:'placedPosition',
            labelValue:'Position',
            inpType:'text',
            inpPlaceholder:'Your Position'
        },
        {
            htmlfor:'Salary',
            labelValue:'Salary',
            inpType:'text',
            inpPlaceholder:'Your salary in LPA'
        }
    ]
    return (
        <div className="placed">
            {
                infos.map((el,ind)=>{
                    return(
                        <div className="sindiv" key={ind}>
                            <label className='labelinp'   htmlFor={el.htmlfor}>{el.labelValue}</label>
                            <input type={el.inpType} className='sgninp' name={el.htmlfor}  placeholder={el.inpPlaceholder} required/>
                        </div>
                    )
                })
            }
            


        </div>
    );
};

const Other = () => {
    return (
        <div className="other">
            
            <div className="sindiv">
                        <label className='labelinp'   htmlFor="othrsp">Specification</label>
                        <input type="text" className='sgninp' name='othrsp'  placeholder='Specification' required/>
            </div>

            <div className="sindiv">
                        <label className='labelinp'   htmlFor="othrdet">Detials</label>
                        <textarea name="othrdet" className='othrdet'  required></textarea>
            </div>

        </div>
    );
};




export default Signupalu;
