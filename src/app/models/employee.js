const connection = require('../../config/db');
const getAllEmployee = ()=>
    {
        return new Promise((resolve, reject)=>
        {
            var sql = "SELECT user.id, full_name, gender, age, email, phone_number, status FROM account JOIN user ON account.id = user.account_id WHERE role =2";
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
const searchQueryEmployee = (query)=>
    {
        return new Promise((resolve, reject)=>
        {
            var sql = `SELECT user.id, full_name, gender, age, email, phone_number, status FROM account JOIN user ON account.id = user.account_id WHERE full_name LIKE '%${query}%' AND role =2`;
            connection.query(sql, (err, res)=>
            {
                console.log(res)
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
    const updateStatusEmployee = (data)=>
        {
            return new Promise((resolve, reject)=>{
              
                var sql = `UPDATE user SET status = ${data.status} WHERE id = ${data.user_id}`;
                
                connection.query(sql, (err, res)=>{
                    if(!err)
                        resolve({
                            status:'success', 
                            data:res
                        });
                    else 
                        resolve({
                            status:'error', 
                            debug:err
                        })
                })
            })
        }

module.exports = {getAllEmployee, searchQueryEmployee, updateStatusEmployee}