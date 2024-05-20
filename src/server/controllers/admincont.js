
import bcrypt from 'bcrypt'
// news updtae...
const adminNewsAdd=async(req,res)=>{
    let db=req.db;
    const {title,date,news,adminid}=req.body;
   try{
        let query=`INSERT INTO news (title, adminid, date_pub, content) VALUES ($1,$2,$3,$4)`;
        let result=db.query(query,[title,adminid,date,news])
        return res.status(201).json({ msg: 'News inserted'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error',error });
    }
}

//nw admin
const adminAdd = async (req, res) => {
    console.log(req.body);
    let db = req.db;
    const { name, uniqueid, address, email, ph, password } = req.body;

    try {
       
        let tmpPass = await bcrypt.hash(password, 5);
        console.log(tmpPass);

        
        let query = `INSERT INTO adminmain (name, adminid, address, password, email, ph) VALUES ($1, $2, $3, $4, $5, $6)`;
        let rep= await db.query(query, [name, uniqueid, address, tmpPass, email, ph]);
        return res.status(201).json({ msg: 'Admin created' });
    } catch (error) {
        console.log("Error during admin creation:", error);
        // Check for unique constraint violation error (PostgreSQL error code for unique violation is 23505)
        if (error.code === '23505') {
            return res.status(400).json({ msg: 'User already exists' });
        }

        return res.status(500).json({ msg: 'Server error' });
    }
};


export default {adminNewsAdd,adminAdd};