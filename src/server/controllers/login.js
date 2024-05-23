import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'my_secret_key';
const SECRET_KEY_Al = 'my_secret_key_al';

const LoginAlumini = async (req, res) => {
    const db = req.db;
    let { regno, password } = req.body;
    try {
        const query = 'SELECT * FROM alumni_personal WHERE regno = $1';
        const result = await db.query(query, [regno]);
        let aluminis = result.rows;
        if (aluminis.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        let alum = aluminis[0];
        console.log(alum);

        const career=alum.career;
        const match = await bcrypt.compare(password, alum.password);
        let otherDet='Placed';
        let otherData;
        if (match) {
            const token = jwt.sign({ reg: regno }, SECRET_KEY_Al, { expiresIn: '10h' });

            if(career==='Placed'){

                try{
                    let qu2=`select * from  alumni_placed where regno = $1`;
                    let res1=await db.query(qu2,[regno]);
                    otherData=res1.rows[0];
                }
                catch(err){
                    return res.status(401).json({ msg: 'other fetching error' });
                }

            }
            else if(career==='Higher Studies'){
                try{
                    let qu2=`select * from  alumni_studying where regno = $1`;
                    let res1=await db.query(qu2,[regno]);
                    otherData=res1.rows[0];
                }
                catch(err){
                    return res.status(401).json({ msg: 'other fetching error' });
                }

            }
            else{

                try{
                    let qu2=`select * from  alumni_others where regno = $1`;
                    let res1=await db.query(qu2,[regno]);
                    otherData=res1.rows[0];
                }
                catch(err){
                    return res.status(401).json({ msg: 'other fetching error' });
                }

            }
            console.log(otherData);

            let {department,phno,year_of_pass_out,regnu,name,email}=alum;
            let finaldata={career,department,phno,year_of_pass_out,regnu,name,email, ... otherData}
            return res.status(200).json({ msg: 'success', token,finaldata });
        }
        
        return res.status(401).json({ msg: 'Password does not match' });
    } catch (err) {
        console.error('Error during alumini login:', err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

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
    let initialLog = 'false';

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
            try {
                const updateQuery = 'UPDATE adminmain SET last_login = $2 WHERE adminid = $1';
                let resp = await db.query(updateQuery, [id, todayDate]);
                console.log('Login update successful');
            } catch (error) {
                console.log('Login update error:', error);
                return res.status(400).json({ msg: 'Login update error' });
            }

            // Exclude password from response
            const { password, ...adminDetails } = admin;

            // Setting cookie
            // res.cookie('token', token, {
            //     httpOnly: true,
            //     secure: false, // Uncomment if using HTTPS
            //     maxAge: 3600000 * 5 // 5 hours
            // });

            return res.status(200).json({ msg: 'Success', token, admin: adminDetails });
        }

        return res.status(401).json({ msg: 'Password does not match' });
    } catch (err) {
        console.error('Error during admin login:', err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

export default { LoginAlumini, LoginAdmin };
