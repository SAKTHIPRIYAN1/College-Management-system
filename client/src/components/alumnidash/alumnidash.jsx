import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link ,Outlet} from "react-router-dom";
import './alumdash.css'

import { SERVER_URL } from "../../App";
const AlumniDash = () => {
    const navigate=useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            
            try {
                const response = await axios.get(SERVER_URL+'/protectalumini', {
                    headers: { Authorization: `Bearer ${token}` } 
               });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.warn('Error fetching protected data: in alumini dash board');
                setError(error);
                setLoading(false);

                navigate('/loginpage/alumini')
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Nopeee</div>;

    return (
        <div className="alumdash">
             {loading ||
                <div className="admindash">
                    <div className="adminside almside">
                        <AlumniSide />
                    </div>
                    <section className="almbdy">
                        {/* {console.log(admin)} */}
                         <Outlet />
                    </section>
                </div>
             } 
        </div>
    );
};

const AlumniSide = () => {
    const sidecon = [
        { topic: "Detais", path: '/aluminiDash'},
        { topic: "Events", path: '/aluminiDash/events'},
        { topic: "Edit Detials", path: '/aluminiDash/edit'},
        { topic: "Change Password", path: '/aluminiDash/changepassword'},
    ];


    return (
        sidecon.map((el, ind) => {
            return (
                <Link to={el.path} className="sidlink" key={ind}>
                    <p className='sidtp'>{el.topic}</p>
                </Link>
            )
        })
    );
};



export default AlumniDash;
