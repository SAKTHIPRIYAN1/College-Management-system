import express from 'express';
import aluminiController from '../controllers/aluminReg.js'
let AluminiRoute=express.Router();
AluminiRoute.get('/',async(req,res)=>{
    res.status(200).json({msg:'okk'});
});


AluminiRoute.post('/register',aluminiController.RegisterAlumini);

AluminiRoute.put('/edit',aluminiController.AlumniEdit);

AluminiRoute.patch('/changepassword',aluminiController.AlumniChangePass);

AluminiRoute.post('/eventrequest',aluminiController.AlumniEvent)

AluminiRoute.get('/eventrequests/:regno',aluminiController.AlumniEventTable)


export default {AluminiRoute};
