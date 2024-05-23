
import bcrypt from'bcrypt';
import { query } from 'express';

const RegisterAlumini=async(req,res)=>{
    const db = req.db;
    console.log(req.body);
    
const body=req.body;
const hashedPassword = await bcrypt.hash(body.password, 5);


let secQuery,secValues=[];
const query=`INSERT INTO alumni_personal (name, regno, email, phno, department, year_of_pass_out, career,password)VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
let values=[body.name, body.regno, body.email,body.phoNo,body.dep, body.year_of_passing, body.next_step, hashedPassword];
    

if (body.next_step==='placed'){
        secQuery=`INSERT INTO alumni_placed ( regno, company,position,salary)VALUES ($1, $2, $3, $4)`;
        secValues=[body.regno,body. placedCompany,body.placedPosition,body.Salary];
        values=[body.name, body.regno, body.email,body.phoNo,body.dep, body.year_of_passing, "Placed", hashedPassword];
}
    else if(body.next_step==='higher'){
        secQuery=`INSERT INTO alumni_studying ( regno, university ,course,specification) VALUES ($1, $2, $3, $4)`;
        secValues=[body.regno,body.Higherclg,body.highercourse,body.Higherspl];
        values=[body.name, body.regno, body.email,body.phoNo,body.dep, body.year_of_passing, "Higher Studies", hashedPassword];
    }
     else if(body.next_step==='other'){
        secQuery=`INSERT INTO alumni_others ( regno,specification,details) VALUES ($1, $2, $3)`;
        secValues=[body.regno,body.othrsp,body.othrdet];
        values=[body.name, body.regno, body.email,body.phoNo,body.dep, body.year_of_passing, "Other", hashedPassword];
    }
    else{
        return res.status(404).json({ msg: 'Invalid Request' });
    }

    try {
        // Insert the data into the PostgreSQL database
        const result = await db.query(query,values);
        const res2= await db.query(secQuery,secValues);

       return res.status(201).json({ msg: 'Alumni registered successfully', id: result.rows[0]});

        } catch (error) {
        console.log(error);
        if(error.detail){
            return res.status(500).json({ msg: 'User already exists' });
        }
        if (error.code === '23505') {
            return res.status(400).json({ msg: 'User already exists' });
        }
        return  res.status(500).json({ msg: 'Server error' });
    }


};

// update alumni...
const AlumniEdit = async (req, res) => {
    const db = req.db;
    const body = req.body;
    
    try {
        // Construct the base update query for alumni_personal
        const query = `
            UPDATE alumni_personal
            SET name = $1, email = $2, phno = $3, department = $4, year_of_pass_out = $5, career = $6
            WHERE regno = $7
        `;
        const values = [body.name, body.email, body.phno, body.department, body.year_of_pass_out, body.career, body.regno];

        // Execute the base update query
        await db.query(query, values);
        // Determine the secondary table to update based on career
        let secQuery;
        let secValues;
        if (body.career === 'Placed') {
            secQuery = `
                UPDATE alumni_placed
                SET company = $1, position = $2, salary = $3
                WHERE regno = $4
            `;
            secValues = [body.company, body.position, body.salary, body.regno];
        } else if (body.career === 'Higher Studies') {
            secQuery = `
                UPDATE alumni_studying
                SET university = $1, course = $2, specification = $3
                WHERE regno = $4
            `;
            secValues = [body.university, body.course, body.specification, body.regno];
        } else if (body.career === 'Other') {
            secQuery = `
                UPDATE alumni_others
                SET specification = $1, details = $2
                WHERE regno = $3
            `;
            secValues = [body.specification, body.details, body.regno];
        } else {
            return res.status(404).json({ msg: 'Invalid career path' });
        }

        // Execute the secondary update query
        await db.query(secQuery, secValues);
        return res.status(200).json({ msg: 'Alumni information updated successfully',});

    } catch (error) {
        console.log(error);
        if (error.code === '23505') {
            return res.status(400).json({ msg: 'Duplicate data found' });
        }
        return res.status(500).json({ msg: 'Server error' });
    }
};

// alumni Change passwordd...
const AlumniChangePass=async(req,res)=>{
    // console.log(req.body);
    const {old_password,newpassword,regno}=req.body;
    let db=req.db;

    try {

        // selecting the password...
        let  q1=`select * from alumni_personal where regno=$1`;
        let result= await db.query(q1,[regno]);
        // console.log(result.rows)

        let {password} =result.rows[0];

        // Verify the old password
        const isMatch = await bcrypt.compare(old_password, password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Old password is incorrect' });
        }


        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 5);
        let  q2=`update alumni_personal set password=$2 where regno=$1`;
        let res2= db.query(q2,[regno,hashedPassword]);
        return res.status(200).json({ msg: 'Password changed successfully' });

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
      }
}


// alumni req event
const AlumniEvent = async (req, res) => {
    let db = req.db;
    const { regno, eventName, purpose, venue, details, cr_date, req_date } = req.body;

    try {
        console.log(req.body);
        let qu1 = `INSERT INTO event_requests (regno, eventname, purpose, venue, details, cr_date, rq_date) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        let result = await db.query(qu1, [regno, eventName, purpose, venue, details, cr_date, req_date]);

        console.log('Event request submitted...');
        return res.status(201).json({ msg: 'Event request submitted successfully'});
    } catch (error) {
        // console.error(error);
        if (error.code === '23505') {
            return res.status(400).json({ msg: 'Duplicate data found' });
        }
        return res.status(500).json({ msg: 'Server error' });
    }
};


// alumni log event
const AlumniEventTable= async (req, res) => {
    let db=req.db;
    const {regno}=req.params;
    try{
        let qu1=`select * from event_requests where regno=$1`;
        let result= await db.query(qu1,[regno]);
        return res.status(200).json({msg:'data fetched',res:result.rows});
    }
    catch(error){
        return res.status(500).json({ msg: 'Server error' });
    }
    
}


export default {RegisterAlumini,AlumniEdit,AlumniChangePass,AlumniEvent,AlumniEventTable};