
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY='my_secret_key';


const LoginAlumini=async(req,res)=>{
    const db = req.db;
    let {regno,password}=req.body;
    try{
        const query = 'SELECT * FROM alumni_personal WHERE regno = $1';
        const result = await db.query(query, [regno]);
        let aluminis=result.rows;
        if(aluminis.length===0){
            res.status(404).json({msg:'User not found'});
        }
        else{
            let alum=aluminis[0];
            const match = await bcrypt.compare(password, alum.password);
            if(match){
                const token = jwt.sign({ reg: regno }, SECRET_KEY, { expiresIn: '1h' });
               return res.status(200).json({ msg:'sucess',token });
            }
            return res.status(401).json({ msg: 'Password does not match' });
        }
    }
    catch(err){
        console.error('Error during alumini login:', err);
       return res.status(500).json({ msg: 'Server error' });
    }
}

const LoginAdmin=async(req,res)=>{
    // console.log(req.db);
    const { id, password } = req.body;
    const db = req.db;

    try {
        // Use parameterized query to prevent SQL injection
        const query = 'SELECT * FROM adminmain WHERE adminid = $1';
        const result = await db.query(query, [id]);
        const admins = result.rows;

        if (admins.length === 0) {
            return res.status(404).json({ msg: 'Admin not found' });
        }
        const admin = admins[0];
        const match = await bcrypt.compare(password, admin.password);

        if(match){
            console.log('mtchhh')
            const token = jwt.sign({ id:id}, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ msg:'sucess',token });
        }

        return res.status(401).json({ msg: 'Password does not match' });
    } catch (err) {
        console.error('Error during admin login:', err);
        return res.status(500).json({ msg: 'Server error' });
    }
    // res.status(200).json({hii:"hii"});
}
export default {LoginAlumini,LoginAdmin};