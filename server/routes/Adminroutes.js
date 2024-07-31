import express from 'express';
import adminController from '../controllers/admincont.js'
let adminRoute=express.Router();

adminRoute.get('/',async(req,res)=>{
    res.status(200).json({msg:'okk'});
});



// news route..
adminRoute.post('/announce',adminController.adminNewsAdd)

// new admin route..
adminRoute.post('/newadmin',adminController.adminAdd)


adminRoute.patch('/changepassword',adminController.Adminchangepass)


// /eventrequests
adminRoute.get('/eventrequests',adminController.AdminEventReq)

// approv events request....
adminRoute.patch('/eventrequests/approve',adminController.AdminAprpove)

// reject events request....
adminRoute.patch('/eventrequests/reject',adminController.AdminReject)

// /logs
adminRoute.get('/logs',adminController.AdminLogs)

adminRoute.get('/clearlogs',async(req,res)=>{
    let db=req.db;
    try{
        let q1=`SELECT truncate_table('logs');`
        let resp=await db.query(q1);
        return res.status(200).json({msg:'Log cleared'})
    }
    catch(err){
        return res.json({msg:'Log error'})
    }
});

export default {adminRoute};