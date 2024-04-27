const getAllArea = ()=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = "SELECT * FROM area";
        connection.query(sql, (err, res)=>
        {
            if(!err)
                resolve(res);
            else 
                resolve({
                    status:"error", 
                    message: "Error getting data", 
                    debug:err
                })
        })
    })
}

module.exports= {getAllArea}