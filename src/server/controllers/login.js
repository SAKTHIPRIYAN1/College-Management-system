
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

  const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };


    const LoginAdmin = async (req, res) => {
        const { id, password } = req.body; 
        const db = req.db;
        let initialLog='false'
        try {
            const query = 'SELECT * FROM adminmain WHERE adminid = $1';
            const result = await db.query(query, [id]);
            const admins = result.rows;
    
            if (admins.length === 0) {
                return res.status(404).json({ msg: 'Admin not found' });
            }
    
            const admin = admins[0];
            const match = await bcrypt.compare(password, admin.password);
    
            if (match) {
                const token = jwt.sign({ id: id }, SECRET_KEY, { expiresIn: '10h' });
    
                // Updating last login
                const todayDate = getTodayDate();
                let passkey=req.body.password
                const initialLog=await bcrypt.compare(passkey, "ini123");
                console.log("Password:", passkey);
                console.log("Initial Log:", initialLog);
                try {
                    const updateQuery = 'UPDATE adminmain SET last_login = $2 WHERE adminid = $1';
                  let resp=await db.query(updateQuery, [id, todayDate]);
                    console.log('Login update successful');

                    // initial loginn....
                    
                    if(initialLog){
                        return res.status(200).json({ msg: 'Success', token, admin: adminDetails,ini:initialLog });
                    }

                } catch (error) {
                    console.log('Login update error:', error);
                    return res.status(400).json({ msg: 'Login update error' });
                }
    
                // Include admin details in the response
                const { password, ...adminDetails } = admin; // Exclude password from response
                return res.status(200).json({ msg: 'Success', token, admin: adminDetails,ini:initialLog });
            }
    
            return res.status(401).json({ msg: 'Password does not match' });
        } catch (err) {
            console.error('Error during admin login:', err);
            return res.status(500).json({ msg: 'Server error' });
        }
    }
    


export default {LoginAlumini,LoginAdmin};