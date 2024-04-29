const connection = require('../../config/db');
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
const searchQuery = (query)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `SELECT * FROM area WHERE name LIKE '%${query}%'`;
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
const insertArea = (data) =>
{
    return new Promise((resolve, reject)=>
    {
        var sql = "INSERT INTO area (name, note) VALUES(?)";
        var value = [data.area_name, data.area_note];
        connection.query(sql,[value],  (err, res)=>
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

const filterData = (status, area)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `SELECT * FROM roomtable WHERE name LIKE '%?%' AND status = ?`;
        var  value = [area, null];
        // if(area != 'all' && status !='all')
        // {
        //     sql = 
        // }
        // else if(area == "all")
        //     sql = `SELECT * FROM roomtable WHERE status = ${status}`;
        // else if(status == 'all')
        //     sql = `SELECT * FROM roomtable WHERE name LIKE '%${area}%'`;
        // else 
        //     sql = "SELECT * FROM roomtable";
        connection.query(sql,[value],  (err, res)=>
        {
            console.log(res);
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

module.exports= {getAllArea, insertArea, searchQuery, filterData}