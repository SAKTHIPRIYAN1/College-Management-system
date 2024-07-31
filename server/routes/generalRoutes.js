import express from 'express'
import newscon from '../controllers/generalcont.js'

let genralRoute=express.Router();

genralRoute.get('/home/news',newscon.newsCont);

genralRoute.post('/placements',newscon.PlacCont);

// cursor callingg...
genralRoute.get('/department_salaries', async (req, res) => {
    const departments = ['CSE', 'MECH', 'CIVIL',"ECE", 'EEE'];
    let db = req.db;
    let results = [];
  
    try {
      for (const dep of departments) {
        const result = await db.query(`SELECT ROUND(avg_salary_lst($1), 2) AS avg_salary`, [dep]);
        results.push({ department: dep, avg_salary: result.rows[0].avg_salary });
      }
  
      res.json(results);
  
    } catch (err) {
      console.log('Error executing query', err.stack);
      res.status(500).json({ error: 'An error occurred while fetching average salaries.' });
    }
  });


//   for alumnini
  genralRoute.get('/alumni',async(req,res)=>{
    let db=req.db;
    try{
        let q1=`select * from alumni_personal`;
        let resp=await db.query(q1);

        return res.status(200).json(resp.rows);
    }catch (error) {
        console.log('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  });


export default {genralRoute};