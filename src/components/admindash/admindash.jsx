import './admindash.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const AdminDash = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/protect', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching protected data:', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admincontain">
            <div className="admindash">
                <div className="adminside">
                    <AdminSide />
                </div>
                <section className="adminbdy">
                    <h1>Details Of Admin</h1>
                    <AdminAddr />
                </section>
            </div>
        </div>
    );
};

const AdminSide = () => {
    const sidecon = [
        { topic: "News", path: '/news' },
        { topic: "Events", path: '/events' },
        { topic: "CUIC", path: '/cuic' },
        { topic: "New User", path: '/new-user' },
        { topic: "Logs", path: '/logs' }
    ];

    return (
        sidecon.map((el, ind) => {
            return (
                <div className="sidlink" key={ind}>
                    <Link to={el.path} className='sidtp'>{el.topic}</Link>
                </div>
            )
        })
    );
};

const AdminAddr = () => {
    const divs = [
        ["Name", "AdminTd"],
        ["Phone", "Email"],
        ["Addr", "Last Login"],
    ];
    return (
        divs.map((el, ind) => {
            return (
                <div className="adDetRows" key={ind}>
                    <div className="sindiv">
                        <label className='labeladdr' htmlFor="regno">{el[0]}</label>
                        <div className={`sgninp ext`}>
                            <p>HIiii</p>
                        </div>
                    </div>
                    <div className="sindiv">
                        <label className='labeladdr' htmlFor="regno">{el[1]}</label>
                        <div className={`sgninp ext`}>
                            <p>HIiii</p>
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default AdminDash;
