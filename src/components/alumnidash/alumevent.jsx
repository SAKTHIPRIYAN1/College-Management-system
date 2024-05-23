import { useState, useEffect,useContext } from "react";
import axios from "axios";
import "./alumdash.css";

const Alumevent = () => {
    const [alum, setAlum] = useState(null);

    useEffect(() => {
        // Retrieve admin details from session storage
        const alumDetails = sessionStorage.getItem('alum');
        if (alumDetails) {
            setAlum(JSON.parse(alumDetails));
        }
    }, []);


    return alum ? <RequestForm alum={alum} /> : <p>Loading...</p>;
};

const RequestForm = ({ alum }) => {

    const [tbupt,setupt]=useState(0);

    const [formData, setFormData] = useState({
        regno: alum.regno || "",
        eventName: '',
        purpose: '',
        venue: '',
        details: '',
        req_date: '',
        cr_date: new Date().toISOString().split('T')[0]  // Current date in YYYY-MM-DD format
    });
    const [err, setErr] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.req_date <= new Date().toISOString().split('T')[0]) {
            setErr('Request date must be a future date');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/alumini/eventrequest', formData);
            console.log('Event request submitted:', response.data);

            setupt(curr=>{
                return curr+1;
            });

            setErr(' ');
        } catch (error) {
            if (error.response) {
                setErr(error.response.data.msg);
                console.log('Error:', error.response.data.msg);
            } else if (error.request) {
                setErr('No response from server.');
                console.log('Error request data:', error.request);
            } else {
                setErr('Server error.');
                console.log('Server error:', error.message);
            }
        }
    };

    return (
        <div className="evmaincontain">
            <h1>Form Registration</h1>
            <div className="event-request-form">
                <h1>Request Permission for Event</h1>
                <form onSubmit={handleSubmit} className="frm">
                    <div className="alDetRows">
                        <div className="form-group">
                            <label htmlFor="regno">Regno</label>
                            <p className="alinp">
                                {formData.regno}
                            </p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="eventName">Event Name</label>
                            <input
                                type="text"
                                placeholder="event name"
                                id="eventName"
                                name="eventName"
                                className="alinp"
                                value={formData.eventName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="alDetRows">
                        <div className="form-group">
                            <label htmlFor="purpose">Purpose</label>
                            <input
                                type="text"
                                placeholder="purpose"
                                id="purpose"
                                name="purpose"
                                className="alinp"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="venue">Venue</label>
                            <input
                                type="text"
                                placeholder="venue"
                                id="venue"
                                name="venue"
                                className="alinp"
                                value={formData.venue}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="alDetRows">
                        <div className="form-group clmn">
                            <label className="labelinp" htmlFor="details">Detail Description</label>
                            <textarea
                                name="details"
                                id="details"
                                onChange={handleInputChange}
                                className="evdet"
                                placeholder="Enter the description"
                                value={formData.details}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="labelinp" htmlFor="req_date">Request Date</label>
                            <input
                                type="date"
                                name="req_date"
                                className="alinp"
                                value={formData.req_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <p className="errmsg alerr">{err}</p>
                    <button type="submit" className="head_butt cl mr30">Submit</button>
                </form>
            </div>
            <Eventstatus regno={formData.regno} upt={tbupt} />
        </div>
    );
};

const Eventstatus = ({ regno,upt }) => {
    return (
        <div className="evstat">
            <h1>Event Logs History</h1>
            <Evtb regno={regno} upt={upt} />
        </div>
    );
};

const Evtb = ({ regno,upt }) => {
    const [eventsTab, setEventRequests] = useState([]);
    useEffect(() => {
        const fetchEventRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/alumini/eventrequests/${regno}`);
                console.log('hii')
                setEventRequests(response.data.res);
                console.log(response.data.res);
            } catch (error) {
                console.log('fetching error')
                console.error('Error fetching event requests:', error);
            }
        };
        if (regno) {
            fetchEventRequests();
        }
    }, [regno,upt]);


/*
Object { regno: "2022103562", eventname: "ho", purpose: "newp", … }
cr_date: "2024-05-21T18:30:00.000Z"
details: "hwll"
eventname: "ho"
purpose: "newp"
regno: "2022103562"
rq_date: "2024-05-30T18:30:00.000Z"
status: "Pending"
venue: "TagAudi"
*/

    return (
        <div className="evreq">
            {eventsTab.length > 0 ? (
                <table className="evtb">
                    <thead>
                        <tr>
                            <th className="evth">Event Name</th>
                            <th className="evth">Purpose</th>
                            <th className="evth">Venue</th>
                            <th className="evth">Event Date</th>
                            <th className="evth" style={{borderRight:'none'}} >Request Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {eventsTab.map((event, index) => (
                            <tr  key={index} className="evrw">
                                <td className="evtd">{event.eventname}</td>
                                <td className="evtd">{event.purpose}</td>
                                <td className="evtd">{event.venue}</td>
                                <td className="evtd">{(event.cr_date).split('T')[0]}</td>
                                <td className="evtd" style={{borderRight:'none'}} >{event.status}</td>
                            </tr>
                        ))}
                    </tbody>
                
                </table>
            ) : (
                <p className="gry">No event requests found.</p>
            )}
        </div>
    );
};
export default Alumevent;
