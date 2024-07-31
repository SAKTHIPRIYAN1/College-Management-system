const newsCont=async(req,res)=>{
    let db=req.db;
   try{
        let qu1=`select * from news_desc_view`;
        let resp=await db.query(qu1);
        return res.status(200).json({msg:'succc',result:resp.rows});
   }
   catch(err){
    //console.log("news error")
    return res.status(404).json({msg:'news not fetchde'})
   }
   
};

const PlacCont=async(req,res)=>{
     const { year, department } = req.body;
     let db=req.db;
//console.log(year);
    try {
        let query;
        let values;

     //    select name,al.regno,department,company,position from alumni_personal as al  join alumni_placed as b on al.regno=b.regno where year_of_pass_out=2023;
        
        if (year) {
            query = `
            select name,salary,department,company,position from alumni_personal as al  join alumni_placed as b on al.regno=b.regno where year_of_pass_out=$1 and department =$2`
            ;
            values = [year, department];
        } else {
            query = `
            select name,salary,department,company,position from alumni_personal as al  join alumni_placed as b on al.regno=b.regno where department =$1`
            ;
            values = [department];
        }

        const result = await db.query(query, values);
        return res.json(result.rows);

    } catch (err) {

        //console.log('Error executing query', err.stack);
        return res.status(500).json({ error: 'Internal server error' });

    }

}

export default {newsCont,PlacCont};