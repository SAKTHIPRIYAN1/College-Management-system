
import { useState,useEffect } from "react";
import axios from "axios";
const News=()=>{

    const [admin, setAdmin] = useState(null);
    useEffect(() => {
        // Retrieve admin details from local storage
        const adminDetails = localStorage.getItem('admin');
        if (adminDetails) {
            setAdmin(JSON.parse(adminDetails));
        }
    }, []);

    return(
        <div className="newscon">
            <h1>Create Announcements</h1>
             <CreateAnnoun ad={admin}/>
        </div>
    )
};

const CreateAnnoun=({ad})=>{
    // console.log(ad)
    const adminid= ad && ad.adminid ? ad.adminid :"";

    let [passmsg,seterrmsg]=useState('');
    let tags=[
        {
            name:'Title:',
            inptyp:'text',
            placeholder:'Enter title',
            inpnam:'title'
        },
        {
            name:'Date:',
            inptyp:'date',
            placeholder:'',
            inpnam:'date'
        },
    ]
   
        // Function to get today's date in YYYY-MM-DD format
        const getTodayDate = () => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
            const dd = String(today.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        const todayDate = getTodayDate();


        const handlesub=async(e)=>{
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            console.log(data);
            const data2={...data,adminid};
            console.log(data2);
            try{
                let response= await axios.post('http://localhost:3000/admin/announce',data2)
                console.log("news inserted");
                seterrmsg('');
                e.target.reset();
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

    return(
        <div className="creatAnnoun">
                <form className="announcement" onSubmit={handlesub}>
                    <div className="nwsrow">
                    {
                        tags.map((el,ind)=>{
                                return(
                                    <div className="nwsdiv " key={ind}>
                                    <label className='labelinp'  htmlFor={el.name}>{el.name}</label>
                                    
                                    {el.inptyp === 'date' ? (
                <input type="date" className='nwsinp dt' name={el.inpnam} value={todayDate} placeholder={el.placeholder} readOnly />) : (
                <input type={el.inptyp} className='nwsinp' name={el.inpnam} placeholder={el.placeholder} required />
            )}

                                    </div>
                                )
                        })
                    }
                    </div>
                    <div className="announce_contain">
                         <label className='labelinp'  htmlFor='announce'>Announcement :</label>
                        <textarea name="news" id="" className="announce" placeholder="Enter the announcement" required></textarea>
                    </div>
                    <button type="submit" className='nws_butt'>Announce</button>
                    <p className='errmsg mar10'>{passmsg}</p>
                </form>
        </div>
    )
}


export default News;