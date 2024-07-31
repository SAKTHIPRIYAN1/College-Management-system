import { useState, useEffect } from 'react';
import axios from 'axios';

import { SERVER_URL } from '../../App';
const AdminLogs = () => {
    const [adminLogs, setAdminLogs] = useState([]);

    useEffect(() => {
        const fetchAdminLogs = async () => {
            try {
                const response = await axios.get(SERVER_URL+'/admin/logs');
                setAdminLogs(response.data.result);
            } catch (error) {
                console.error('Error fetching admin logs:', error);
            }
        };
        fetchAdminLogs();
    }, []);

    const clearlogs=async()=>{
        try{

            const response = await axios.get(SERVER_URL+'/admin/clearlogs');
            setAdminLogs([]);
        }
        catch(err){
            console.log('errr');
        }
    }
    return (
        <div className="admin_logs_con">
            <div className="flex flx_con">

            <h1 style={{margin:'0px'}} className='h1n'>Admin Logs</h1>

            {adminLogs.length > 0 ? (  <button onClick={clearlogs} className='clr_all head_butt'>Clear All</button>):<div></div>}

            </div>
            
            {adminLogs.length > 0 ? (
                
                <table className="admin_logs_table">
                    <thead>
                        <tr>
                            <th className="adth">Admin ID</th>
                            <th className="adth">Reg No</th>
                            <th className="adth">Res Name</th>
                            <th className="adth">Date of Res</th>
                            <th className="adth" style={{ borderRight: 'none' }}>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminLogs.map((log, index) => (
                            <tr className="adtr" key={index}>
                                <td className="adtd">{log.adminid}</td>
                                <td className="adtd">{log.regno}</td>
                                <td className="adtd">{log.req_name}</td>
                                <td className="adtd">{(log.date_of_res).split('T')[0]}</td>
                                <td className="adtd" style={{ borderRight: 'none' }}>{log.response}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="gry">No admin logs found.</p>
            )}
        </div>
    );
}

export default AdminLogs;
