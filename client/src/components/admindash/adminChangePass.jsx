
import axios from "axios";
import { useState,useEffect ,useRef} from "react";
import {useInView,useAnimation,motion,easeIn} from "framer-motion";

import { SERVER_URL } from "../../App";

const AdminChangePass=()=>{



    let aluref = useRef(null);
    let aluvw = useInView(aluref);
    let aluctrl = useAnimation();

    useEffect(() => {
        if (aluvw) aluctrl.start('animate');
    }, [aluvw]);


    const [admin, setAdmin] = useState(null);
    useEffect(() => {
        // Retrieve admin details from local storage
        const adminDetails = localStorage.getItem('admin');
        if (adminDetails) {
            setAdmin(JSON.parse(adminDetails));
        }
        // console.log(adminDetails);
        
    }, []);

    let [passmsg,seterrmsg]=useState('');

    let adminId=admin && admin.adminid?admin.adminid:' ';
    console.log(adminId);

    const handlesub=async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        let data2 = Object.fromEntries(formData.entries());
        console.log(data2)
        
        if(data2.confrm_password!==data2.newpassword){
            seterrmsg("Password Doesn't Match.");
            return;
        }
        else if(data2.old_password==data2.newpassword){
            seterrmsg("Enter Diff password .");   
            return;
        }
        else{
            data2={...data2,adminId}
            // console.log(data2);
            let passkey=data2.newpassword;
            if(passkey.length<8){
                seterrmsg("Password atleast contain 8 chars");
                return;
            }
            else{
                try{
                let response= await axios.patch(SERVER_URL+'/admin/changepassword',data2)
                seterrmsg('');
                e.target.reset();
                console.log('admin password changed..')
                }
                catch(error){
                    if (error.response) {
                        console.log(error.response.data);
                        seterrmsg(error.response.data.msg);
                    }
                    else if (error.request) {
                        console.log('Error request data:', error.request);
                        seterrmsg(error.request.data.msg);
                    }
                    else{
                        console.log('server error');
                        seterrmsg("server error :500 ");
                    }
                }
            }
        }

    }

    return(
        <motion.div className="rel"
        
        ref={aluref}
        variants={{
            initial: { opacity: 0, x: -100 },
            animate: { opacity: 1, x: 0 }
        }}
        initial="initial"
        animate={aluctrl}
        transition={{ duration: 0.2, delay: 0.1, ease: easeIn }}

        >
            <div className="chnDiv">
            <form onSubmit={handlesub} className='passfrm'>
                <h1 className='crp'>Change Password</h1>
                <div className="sindiv passdiv">
                            <label className='labelinp'  htmlFor="password">Old password</label>
                            <input type="password"  className='sgninp' name="old_password"  placeholder='Enter Old password' required/>
                </div>
                <div className="sindiv passdiv">
                            <label className='labelinp'  htmlFor="name">New password</label>
                            <input type="password" name='newpassword' className='sgninp'  placeholder='enter new Password' required/>
                </div>

                <div className="sindiv passdiv">
                            <label className='labelinp'  htmlFor="name">Confirm Password</label>
                            <input type="password" name='confrm_password' className='sgninp'  placeholder='Conform Password' required/>
                </div>
                
                
                <button type="submit" className='head_butt bg passbutt'>Submit</button>

                <p className='errmsg mar10'>{passmsg}</p>
            </form>
            </div>
        </motion.div >
    )
};
export default AdminChangePass;