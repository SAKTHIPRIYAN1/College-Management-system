import express from 'express';
import adminController from '../controllers/admincont.js'
let adminRoute=express.Router();

adminRoute.get('/',async(req,res)=>{
    res.status(200).json({msg:'okk'});
})
// news route..
adminRoute.post('/announce',adminController.adminNewsAdd)

// new admin route..
adminRoute.post('/newadmin',adminController.adminAdd)

export default {adminRoute};