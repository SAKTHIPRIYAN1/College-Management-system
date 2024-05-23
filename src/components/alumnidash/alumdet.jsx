import { useState,useEffect } from "react";

const Alumdet=()=>{
    const [alum, setAlum] = useState(null);


    useEffect(() => {
        // Retrieve admin details from local storage
        const alumDetails = sessionStorage.getItem('alum');
        
        if (alumDetails) {
            setAlum(JSON.parse(alumDetails));
        }
       
    }, []);

    console.log(alum);

   
    return(
      <div className="mr41">
        <h1 style={{justifySelf:'center',alignSelf:'center'}}>
           Informations of Alumini in College
        </h1>
        <Alumaddr alum={alum} />
      </div>
    )
}

const Alumaddr = ({ alum }) => {
    let divsa = [
        [
            {
                lbl: 'Name',
                js: alum && alum.name ? alum.name : ""
            },
            {
                lbl: 'Regno',
                js: alum && alum.regno ? alum.regno : ""
            },
            {
                lbl: 'Phone',
                js: alum && alum.phno ? alum.phno : ""
            }
        ],
        [
            {
                lbl: 'Email',
                js: alum && alum.email ? alum.email : ""
            },
            {
                lbl: 'Career',
                js: alum && alum.career ? alum.career : ""
            },
            {
                lbl: 'Passed Out',
                js: alum && alum.year_of_pass_out ? alum.year_of_pass_out : ""
            }
        ]
    ];

    const join = () => {
        let other = [];
        if (alum && alum.career) {
            if (alum.career === 'Placed') {
                other = [
                    {
                        lbl: 'Company',
                        js: alum && alum.company ? alum.company : ""
                    },
                    {
                        lbl: 'Position',
                        js: alum && alum.position ? alum.position : ""
                    },
                    {
                        lbl: 'Salary',
                        js: alum && alum.salary ? alum.salary : ""
                    }
                ];
            } else if (alum.career === 'Higher Studies') {
                other = [
                    {
                        lbl: 'University',
                        js: alum && alum.university ? alum.university : ""
                    },
                    {
                        lbl: 'Course',
                        js: alum && alum.course ? alum.course : ""
                    },
                    {
                        lbl: 'Specification',
                        js: alum && alum.specification ? alum.specification : ""
                    }
                ];
            } else {
                other = [
                    {
                        lbl: 'Specification',
                        js: alum && alum.specification ? alum.specification : ""
                    },
                    {
                        lbl: 'Details',
                        js: alum && alum.details ? alum.details : ""
                    }
                ];
            }
        }

        // Combine divsa and other
        divsa.push(other);
        return divsa;
    };


    const combinedData = join();
    return (
        combinedData.map((el, ind) => {
            return (
                <div className="adDetRows" key={ind}>
                    {el.map((item, idx) => (
                        <div className="sindiv adminsindiv" key={idx}>
                            <label className='labeladdr' htmlFor="regno">{item.lbl}</label>
                            <div className={`sgninp ext`}>
                                <p>{item.js}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        })
    );
};



export default Alumdet;