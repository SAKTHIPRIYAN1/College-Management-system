
import bcrypt from 'bcrypt'
import { query } from 'express';
// news updtae...
const adminNewsAdd=async(req,res)=>{
    let db=req.db;
    const {title,date,news,adminid}=req.body;
   try{
        let query=`SELECT InsertNews( $1, $2 , $3, $4);`;
        let result=db.query(query,[title,adminid,date,news])
        return res.status(201).json({ msg: 'News inserted'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error',error });
    }
}

//nw admin
const adminAdd = async (req, res) => {
    //console.log(req.body);
    let db = req.db;
    const { name, uniqueid, address, email, ph, password } = req.body;

    try {
       
        let tmpPass = await bcrypt.hash(password, 5);
        //console.log(tmpPass);

        
        let query = `INSERT INTO adminmain (name, adminid, address, password, email, ph) VALUES ($1, $2, $3, $4, $5, $6)`;
        let rep= await db.query(query, [name, uniqueid, address, tmpPass, email, ph]);
        return res.status(201).json({ msg: 'Admin created' });
    } catch (error) {
        //console.log("Error during admin creation:", error);
        // Check for unique constraint violation error (PostgreSQL error code for unique violation is 23505)
        if (error.code === '23505') {
            return res.status(400).json({ msg: 'User already exists' });
        }


        return res.status(500).json({ msg: 'Server error' });
    }
};


// changing password...
const Adminchangepass= async(req,res)=>{
    //console.log(req.body);
    const {old_password,newpassword,adminId}=req.body;
    let db=req.db;

    try {

        // selecting the password...
        let  q1=`select * from adminmain where adminid=$1`;
        let result= await db.query(q1,[adminId]);
        //console.log(result.rows)

        let {password} =result.rows[0];

        // Verify the old password
        const isMatch = await bcrypt.compare(old_password, password);
        if (!isMatch) {
          return res.status(400).json({ msg: 'Old password is incorrect' });
        }


        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 5);
        let  q2=`update adminmain set password=$2 where adminid=$1`;
        let res2= db.query(q2,[adminId,hashedPassword]);
        return res.status(200).json({ msg: 'Password changed successfully' });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
      }
}


// admin to see all the requetsss.....
const AdminEventReq=async(req,res)=>{
    let db=req.db;
  
    try{
        let qu1=`select * from event_requests where status= $1`;
        let result=await db.query(qu1,['Pending'])
        // //console.log(result.rows)
       return res.status(200).json({msg:'eve fetch success',result:result.rows});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server fetching error' });
      }
};


// admin approve..
const AdminAprpove=async(req,res)=>{
    let db=req.db;
    const {eventname,regno,adminid,date,resp}=req.body;

    try{
        let q1=`update event_requests set status='Approved' where eventname=$1 and regno=$2`;
        let result=await db.query(q1,[eventname,regno]);

        let q2=`insert into logs (adminid,date_of_res,req_name,regno, response) values($1,$2,$3,$4,$5)`;
        let res2=await db.query(q2,[adminid,date,eventname,regno, resp])
        
       return res.status(200).json({ msg: 'Approve success' });
    }
    catch(error){
        //console.log(error)
            return res.status(500).json({ msg: 'fetch error' });
    }
}


// admin reject..
const AdminReject=async(req,res)=>{
    let db=req.db;
    const {eventname,regno,adminid,date,resp}=req.body;

    try{
        let q1=`update event_requests set status='Approved' where eventname=$1 and regno=$2`;
        let result=await db.query(q1,[eventname,regno]);

        let q2=`insert into logs (adminid,date_of_res,req_name,regno, response) values($1,$2,$3,$4,$5)`;
        let res2=await db.query(q2,[adminid,date,eventname,regno, resp])
        
       return res.status(200).json({ msg: 'Reject success' });
    }
    catch(error){
        //console.log(error)
            return res.status(500).json({ msg: 'fetch error' });
    }
}

// admin logs..
const AdminLogs=async(req,res)=>{
    let db=req.db;
    try{
        let q1=`select * from logs`;
        let result=await db.query(q1);
        return res.status(200).json({ msg: 'log Sucess',result:result.rows });
    }
    catch(error){
        return res.status(500).json({ msg: 'fetch error' });
    }
}

export default {adminNewsAdd,adminAdd,Adminchangepass,AdminEventReq,AdminAprpove,AdminReject,AdminLogs};