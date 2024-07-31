import { useState, useEffect } from "react";
import axios from "axios";
import "./alumdash.css";
import { SERVER_URL } from "../../App";
// import '../login/sgup.css'
const Alumedit = () => {
    return (
        <Alumdet />
    );
};

const Alumdet = () => {
   
    const [alum, setAlum] = useState(null);

    useEffect(() => {
        // Retrieve alum details from session storage
        const alumDetails = sessionStorage.getItem('alum');
        if (alumDetails) {
            setAlum(JSON.parse(alumDetails));
        }
    }, []);

    return (
        <div className="mr41">
            <div className="flx">
                <h1 style={{ justifySelf: 'center', alignSelf: 'center' }}>
                    Edit Information of Alumni
                </h1>
            </div>
            {alum ? <Alumaddr alum={alum} setAlum={setAlum} /> : <div>Loading...</div>}
        </div>
    );
};

const Alumaddr = ({ alum, setAlum }) => {
    let [plerr,seterr]=useState('');
    const [editingField, setEditingField] = useState(null);

    const handleInputChange = (e, key) => {
        let updatedAlum = { ...alum, [key]: e.target.value };

        // Reset fields based on selected career option
        if (key === 'career') {
            if (e.target.value === 'Placed') {
                updatedAlum = {
                    ...updatedAlum,
                    university: '',
                    course: '',
                    specification: '',
                    details: ''
                };
            } else if (e.target.value === 'Higher Studies') {
                updatedAlum = {
                    ...updatedAlum,
                    company: '',
                    position: '',
                    salary: '',
                    specification: '',
                    details: ''
                };
            } else if (e.target.value === 'Other') {
                updatedAlum = {
                    ...updatedAlum,
                    company: '',
                    position: '',
                    salary: '',
                    university: '',
                    course: '',
                };
            }
        }

        setAlum(updatedAlum);
    };

    const handleDivClick = (key) => {
        setEditingField(key);
    };

    const handleBlur = () => {
        setEditingField(null);
    };




const renderFields = (fields) => {
        return fields.map((item, idx) => (
            <div className="sindiv adminsindiv" key={idx}>
                <label className='labeladdr'>{item.lbl}</label>
                {item.key === 'regno' ? (
                    <div className="sgninp ext">
                        {item.js}
                    </div>
                ) : (
                    editingField === item.key ? (
                        item.key === 'career' ? (
                            <select className='sgninp aluinp'
                                value={alum[item.key]}
                                onChange={(e) => handleInputChange(e, item.key)}
                                onBlur={handleBlur}
                                autoFocus
                                required
                            >
                                <option value="Placed">Placed</option>
                                <option value="Higher Studies">Higher Studies</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <input className='sgninp aluinp'
                                type="text"
                                value={alum[item.key]}
                                onChange={(e) => handleInputChange(e, item.key)}
                                onBlur={handleBlur}
                                autoFocus
                                required
                            />
                        )
                    ) : (
                        <div
                            className={`sgninp ext`}
                            onClick={() => handleDivClick(item.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {item.js}
                        </div>
                    )
                )}
            </div>
        ));

};

    
    const divsa = [
        [
            { lbl: 'Name', key: 'name', js: alum.name || "" },
            { lbl: 'Regno', key: 'regno', js: alum.regno || "" },
            { lbl: 'Phone', key: 'phno', js: alum.phno || "" }
        ],
        [
            { lbl: 'Email', key: 'email', js: alum.email || "" },
            { lbl: 'Career', key: 'career', js: alum.career || "" },
            { lbl: 'Passed Out', key: 'year_of_pass_out', js: alum.year_of_pass_out || "" }
        ]
    ];

    const join = () => {
        let other = [];
        if (alum && alum.career) {
            if (alum.career === 'Placed') {
                other = [
                    { lbl: 'Company', key: 'company', js: alum.company || "" },
                    { lbl: 'Position', key: 'position', js: alum.position || "" },
                    { lbl: 'Salary', key: 'salary', js: alum.salary || "" }
                ];
            } else if (alum.career === 'Higher Studies') {
                other = [
                    { lbl: 'University', key: 'university', js: alum.university || "" },
                    { lbl: 'Course', key: 'course', js: alum.course || "" },
                    { lbl: 'Specification', key: 'specification', js: alum.specification || "" }
                ];
            } else {
                other = [
                    { lbl: 'Specification', key: 'specification', js: alum.specification || "" },
                    { lbl: 'Details', key: 'details', js: alum.details || "" }
                ];
            }
        }
        return other;
    };

    const combinedData = [...divsa, join()];

    const validateForm = () => {
        for (let key in alum) {
            if (alum[key] === '' || alum[key] === null) {
                seterr('Please fill out all fields.');
                return false;
            }
        }
        return true;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        console.log(alum);
    
        try {
            const response = await axios.put(SERVER_URL+'/alumini/edit', alum);
            console.log('edited Alumini....');
            sessionStorage.setItem('alum', JSON.stringify(alum));
            seterr('Details edited')
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else if (error.request) {
                console.log('Error request data:', error.request);
            } else {
                console.log('server error');
            }
        }
    };

    return (
        <form className='flex' onSubmit={handleClick}>
            {combinedData.map((el, ind) => (
                <div className="adDetRows" key={ind}>
                    {renderFields(el)}
                </div>
            ))}

            <button type='submit' className='head_butt cl'>Submit</button>
            
            <p className='errmsg'>{plerr}</p>
        </form>
    );
};

export default Alumedit;
