
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt'; // Correct import
import pg from 'pg'; // Import pg as a default export
import 'dotenv/config';

import authjwt from './middlewares/authjwt.js';


// routes..
import log from './routes/loginroutes.js';
import al from './routes/AluminiregisterRoutes.js';

let app=express();
app.use(cors());
app.use(bodyParser.json()); 


const loginroute=log.loginroute;
let aluminiRoute=al.AluminiRoute;
const auth=authjwt.auth;

// console.log(AluminiRoute);

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

// passing db to all the controllers....
app.use((req, res, next) => {
  req.db = db;
  next();
});

//  auth middleware

app.use('/login', loginroute);
app.use('/alumini',aluminiRoute);

app.get('/protect',auth,(req,res)=>{
  res.status(200).json({msg:'sucess'});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
})
