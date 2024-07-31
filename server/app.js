
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt'; 


import pg from 'pg'; // Import pg as a default export

// import cookieParser from 'cookie-parser';
// credentialss..
import 'dotenv/config';


import authjwt from './middlewares/authjwt.js';


// routes..
import log from './routes/loginroutes.js';
import al from './routes/AluminiregisterRoutes.js';
import adminrt from './routes/Adminroutes.js';
import genralRoute from './routes/generalRoutes.js'


let app=express();

// app. middlewires
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());


// passing db to all the controllers....
app.use((req, res, next) => {
  req.db = db;
  next();
});
const loginroute=log.loginroute;
let aluminiRoute=al.AluminiRoute;
let adminRoute=adminrt.adminRoute;
let gen=genralRoute.genralRoute;
const auth=authjwt.auth;
const auth2=authjwt.authAl;

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const db = new pg.Client({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require:true,
  }
});

db.connect();


// routes minnddd
app.use('/login', loginroute);
app.use('/alumini',aluminiRoute);
app.use('/admin',adminRoute);
app.use('/general',gen);


// for all protected queries....
app.get('/protect',auth,(req,res)=>{
  res.status(200).json({msg:'sucess'});
});

app.get('/',async(req,res)=>{
  res.status(200).json({msg:'sucess'})
})
// for alumini route...
app.get('/protectalumini',auth2,(req,res)=>{
  res.status(200).json({msg:'sucess'});
});

const PORT = 3000;
app.listen(PORT,() => {
  console.log(`Express listening on port ${PORT}`);
})

