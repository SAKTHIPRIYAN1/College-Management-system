import './admindash.css';
import { useState, useEffect } from "react";
import axios from "axios";
import AdminAddr from './admindetail.jsx';
import { Link,Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from '../../App.jsx';
const AdminDash = () => {
    const navigate=useNavigate();

    // const [admin, setAdmin] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get(SERVER_URL+'/protect', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                navigate('/loginpage/admin',{ replace: true });
                console.log('error fetching auth from admin dash');
                setError(error);
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);
    if(error){
        return(
            <div className="autherrdiv">
                <h1>Not Authorized..</h1>
            </div>
        )
    }

    if(loading){
        <div className="loadingDiv">
            <h1>loading..</h1>
        </div>
    }

    // fetching admin details...
    // useEffect(() => {
    //     // Retrieve admin details from local storage
    //     const adminDetails = localStorage.getItem('admin');
    //     if (adminDetails) {
    //         setAdmin(JSON.parse(adminDetails));
    //     }
    //     // console.log(adminDetails);
    // }, []);

    // console.log(admin);
    
    return (
        <div className="admincontain">
            {loading ||
                <div className="admindash">
                    <div className="adminside">
                        <AdminSide />
                    </div>
                    <section className="adminbdy">
                        {/* {console.log(admin)} */}
                         <Outlet />
                    </section>
                </div>
             } 
        </div>    );
};

const AdminSide = () => {
    const sidecon = [
        { topic: "Detais", path: '/adminDash'},
        { topic: "News", path: '/adminDash/news' },
        { topic: "Events", path: '/adminDash/events' },
        // { topic: "CUIC", path: '/adminDash/cuic' },
        { topic: "New User", path: '/adminDash/new-user' },
        { topic: "Change Password", path: '/adminDash/changepassword' },
        { topic: "Logs", path: '/adminDash/logs' }
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

export default AdminDash;
