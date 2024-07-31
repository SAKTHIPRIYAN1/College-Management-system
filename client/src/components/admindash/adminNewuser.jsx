import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, easeIn } from "framer-motion";
import axios from 'axios'; 
import { SERVER_URL } from "../../App";
import img from '../img/lg.jpg';

const AdminNewuser = () => {
    return <CreateAdmin />;
};

const CreateAdmin = () => {
    // const navigate = useNavigate(); // Uncomment if you plan to use navigate
    const [name, setName] = useState("");
    const [uniqueid, setUniqueId] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [alerr, seterrmsg] = useState("");
    const [ph, setph] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = async (event) => {
        event.preventDefault();

        // regex fro chckk...
        const nameRegex = /^[A-Za-z\s]+$/;
        const addressRegex = /^[A-Za-z\s]+$/;
        const uniqueIdRegex = /^(?=.*\d).{5,}$/;
        const phoneRegex = /^\d{10}$/;

        if (!nameRegex.test(name)) {
            seterrmsg("Name must contain only alphabetics");
            return;
        }

        if(password.length<8){
            seterrmsg("Password must 8 char long");
            return;
        }

        if (!addressRegex.test(address)) {
            seterrmsg("Address must contain only alphabetics");
            return;
        }

        if (!uniqueIdRegex.test(uniqueid)) {
            seterrmsg("Id must have a number, len of 5 chars");
            return;
        }

        if (!phoneRegex.test(ph)) {
            seterrmsg("Invalid Phone number");
            return;
        }

        const data = { name, uniqueid, address, email,ph,password };
        try {
            const response = await axios.post(SERVER_URL+'/admin/newadmin', data);
            console.log(response.data);
            seterrmsg('');
            // Clear the form fields after successful submission
            setName("");
            setUniqueId("");
            setAddress("");
            setEmail("");
            setph("");
            setPassword("");

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                seterrmsg(error.response.data.msg);
            } else if (error.request) {
                console.log('Error request data:', error.request);
                seterrmsg("No response received");
            } else {
                console.log('server error');
                seterrmsg("server error :500 ");
            }
        }
    };

    let aluref = useRef(null);
    let aluvw = useInView(aluref);
    let aluctrl = useAnimation();

    useEffect(() => {
        if (aluvw) aluctrl.start('animate');
    }, [aluvw]);

    return (
        <motion.div
            className="adminlog ad_add_frm"
            ref={aluref}
            variants={{
                initial: { opacity: 0, x: -100 },
                animate: { opacity: 1, x: 0 }
            }}
            initial="initial"
            animate={aluctrl}
            transition={{ duration: 0.2, delay: 0.1, ease: easeIn }}
        >
            <div className="adform ">
                <img className='lgim' src={img} alt="" />
                <form onSubmit={handleClick} className='form'>
                    <h1 className='h1'>Add New Admin</h1>
                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='Admin Name' name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="uniqueid">Unique ID</label>
                        <input type="text" id="uniqueid" placeholder='Unique ID' name="uniqueid" value={uniqueid} onChange={(e) => setUniqueId(e.target.value)} required />
                    </div>


                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="phno">Phone</label>
                        <input type="text" id="ph" placeholder='Phone number' name="ph" value={ph} onChange={(e) => setph(e.target.value)} required />
                    </div>

                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="address">Address</label>
                        <input type="text" id="address" placeholder='Address' name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="frmdiv">
                        <label className="labelinp" htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder='Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className='head_butt bg'>Add Admin</button>
                    <p className='errmsg' style={{marginBottom:"10px"}}>{alerr}</p>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminNewuser;
