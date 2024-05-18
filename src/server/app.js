
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt'; // Correct import
import pg from 'pg'; // Import pg as a default export
import 'dotenv/config';

// import { Pool } from 'pg';

let app=express();
app.use(cors());
app.use(bodyParser.json()); 

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


async function getPgVersion() {
  // const client = await db.connect();
  try {
    const result = await db.query('SELECT version()');
    console.log(result.rows[0]);
  } finally {
    // db.release();
  }
}

getPgVersion();
// Middleware setup
// Parse JSON bodies

// PostgreSQL client setup (example configuration, customize with your DB credentials)

app.post('/admin/login', async (req, res) => {
  // const { adminId, password } = req.body;
 let admin;
  try {
    const query = "select * from adminmain";
    const result = await db.query(query);
    console.log(result.rows);
   
  }
  catch(er){
    console.log(er);
  }

  res.json({admin});
 // Log request body to see received data
});

const PORT = 5174;
app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
