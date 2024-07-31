import express from "express";

let loginroute=express.Router();

import lognincontroller from '../controllers/login.js'

loginroute.post("/",(req,res)=>{
    res.status(200).json({hii:"hii"});
})

loginroute.post("/admin",lognincontroller.LoginAdmin)

loginroute.post('/alumini',lognincontroller.LoginAlumini);

export default {loginroute};