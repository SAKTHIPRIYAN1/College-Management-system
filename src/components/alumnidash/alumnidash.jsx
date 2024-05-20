import { useState, useEffect } from "react";
import axios from "axios";

const AlumniDash = () => {

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Nopeee</div>;

    return (
        <div className="alumdash">
            <h1>Protected Data</h1>
        </div>
    );
};

export default AlumniDash;
