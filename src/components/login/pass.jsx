
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPass=(props)=>{
    // navigator..
    const navigate=useNavigate();

    let data1=props.data;
    let [passmsg,seterrmsg]=useState('');

    console.log(data1);
    const handlesub=async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const data2 = Object.fromEntries(formData.entries());
        console.log(data2)
        if(data2.confrm_password!==data2.password){
            seterrmsg("Password Doesn't Match.");
        }
        else{
            let passkey=data2.password;
            if(passkey.length<8){
                seterrmsg("Password atleast contain 8 chars");
            }
            else{
                const finalData={ ...data1, ...data2 };
                try{
                let response= await axios.post('http://localhost:3000/alumini/register',finalData)
                seterrmsg('');
                localStorage.setItem('token', response.data.token);
                navigate('/aluminiDash');
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
        <div className="passcontain">
            <form onSubmit={handlesub} className='passfrm'>
                <h1 className='crp'>Create Password For register</h1>
                <div className="sindiv passdiv">
                            <label className='labelinp'  htmlFor="password">Name</label>
                            <input type="text"  className='sgninp' name="password"  placeholder='Enter password' required/>
                </div>
                <div className="sindiv passdiv">
                            <label className='labelinp'  htmlFor="name">Name</label>
                            <input type="text" name='confrm_password' className='sgninp'  placeholder='Conform Password' required/>
                </div>
                
                <button type="submit" className='head_butt bg passbutt'>Register</button>

                <p className='errmsg mar10'>{passmsg}</p>
            </form>
        </div>
    )
};
export default ConfirmPass;