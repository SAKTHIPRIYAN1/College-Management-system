import { useState,useEffect } from "react";

const AdminDet=()=>{
    const [admin, setAdmin] = useState(null);

    
    useEffect(() => {
        // Retrieve admin details from local storage
        const adminDetails=sessionStorage.getItem('admin');
        if (adminDetails) {
            setAdmin(JSON.parse(adminDetails));
        }
    }, []);

    return(
      <div className="mr40">
        <h1>Details Of Admin</h1>
        <AdminAddr admin={admin} />
      </div>
    )
}

const AdminAddr = ({admin}) => {
    // console.log('from out:',admin)

    const formattedLastLogin = admin && admin.last_login ? new Date(admin.last_login).toLocaleDateString() : '';

    const divs = [
        ["Name", "AdminTd"],
        ["Phone", "Email"],
        ["Addr", "Last Login"],
    ];

    const divsa=[
        [
            {
                lbl:'Name',
                js:admin && admin.name ? admin.name : ""

            },
            {
                lbl:'AdminId',
                js:admin && admin.adminid ? admin.adminid : ""

            }
        ],
        [
            {
                lbl:'Phone',
                js:admin && admin.ph ? admin.ph : ""

            },
            {
                lbl:'Email',
                js:admin && admin.email ? admin.email : ""

            }
        ],
        [
            {
                lbl:'Addr',
                js:admin && admin.address ? admin.address : ""

            },
            {
                lbl:'Last Login',
                js:formattedLastLogin

            }
        ]

    ]
    return (
        divsa.map((el, ind) => {
            return (
                <div className="adDetRows" key={ind}>
                    <div className="sindiv adminsindiv">
                        <label className='labeladdr' htmlFor="regno">{el[0].lbl}</label>
                        <div className={`sgninp ext`}>
                            <p>{el[0].js}</p>
                        </div>
                    </div>
                    <div className="sindiv adminsindiv">
                        <label className='labeladdr' htmlFor="regno">{el[1].lbl}</label>
                        <div className={`sgninp ext`}>
                            <p>{el[1].js}</p>
                        </div>
                    </div>
                </div>
            );
        })
    );
};

export default AdminDet;