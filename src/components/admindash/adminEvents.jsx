import { useState,useEffect } from "react";
import axios from "axios";

const Adminevents=()=>{
    const [admin, setAdmin] = useState(null);
    useEffect(() => {
        // Retrieve admin details from local storage
        const adminDetails=sessionStorage.getItem('admin');
        if (adminDetails) {
            setAdmin(JSON.parse(adminDetails));
        }
    }, []);

    return(
        <Events admin={admin}/>
    )
};

const Events=({admin})=>{
    return(
        <div className="event_req_con">
            <h1>EVENTS REQUESTS BY ALUMNI</h1>
            <EventTable admin={admin}/>
        </div>
    )
}


const EventTable=({admin})=>{
    const [eventsTab, setEventRequests] = useState([]);
        
    useEffect(() => {
        const fetchEventRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/admin/eventrequests`);
                // console.log('hii')
                setEventRequests(response.data.result);
                console.log(response.data.result);
            } catch (error) {
                console.log('fetching error')
                console.error('Error fetching event requests:', error);
            }
        };
        fetchEventRequests();
    }, []);

    // console.log(admin)
    let adminid ;
    if(admin && admin.adminid){
        adminid=admin.adminid;
    }

const handleApprove = async (index) => {
    
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const date = getTodayDate();

        const event = eventsTab[index];
        console.log('Approving event:', event);
        
        try {
            let resp='Approved';
            console.log(adminid)
            const response = await axios.patch('http://localhost:3000/admin/eventrequests/approve', {...event,date,adminid,resp});
                const updatedEvents=eventsTab.filter((el,ind)=>{
                    return el!=event;
                })
                setEventRequests(updatedEvents);
            
            console.log('approved..')
        } catch (error) {
            console.error('Error approving event request:', error);
        }
};

    const handleReject =async(argu)=>{
        
        const event = eventsTab[argu];
        console.log('rejecting event:', event);

        const getTodayDate = () => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
            const dd = String(today.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };
    
        const date = getTodayDate();

        try {
           let resp='Rejected';
            const response = await axios.patch('http://localhost:3000/admin/eventrequests/reject', {...event,date,adminid,resp});

            const updatedEvents=eventsTab.filter((el,ind)=>{
                return el!=event;
            })
            setEventRequests(updatedEvents);
            console.log('Rejected..');

        } catch (error) {
            console.error('Error rejecting event request:', error);
        }

    }
    return (
        <div className="evreq">
            {eventsTab.length > 0 ? (
                <table className="evtb">
                    <thead>
                        <tr >
                        <th className="adth">Reg</th>
                            <th className="adth">Event Name</th>
                            <th className="adth">Purpose</th>
                            <th className="adth">Venue</th>
                            <th className="adth">Event Date</th>
                            <th className="adth" style={{borderRight:'none'}} >Request Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {eventsTab.map((event, index) => (
                            <tr className="adtr" key={index} >
                               <td className="adtd">{event.regno}</td>
                                <td className="adtd">{event.eventname}</td>
                                <td className="adtd">{event.purpose}</td>
                                <td className="adtd">{event.venue}</td>
                                <td className="adtd">{(event.rq_date).split('T')[0]}</td>
                                <td className="adtd butt_flex" style={{borderRight:'none'}} >

                                    <button onClick={() => handleApprove(index)} className="head_butt ad_butt approve" >Approve</button>
                                    <button onClick={() => handleReject(index)} className="head_butt  ad_butt reject" >Reject</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                
                </table>
            ) : (
                <p className="gry">No event requests found.</p>
            )}
        </div>
    );
}





export default Adminevents;