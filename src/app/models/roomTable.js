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

const filterData = (status, area, q)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `SELECT * FROM roomtable WHERE area ${area == 'all' ? 'IS NOT NULL' : `LIKE '%${area}%'`} AND status ${status =='all' ? 'IS NOT NULL' : `= ${status}`} AND name ${q == null ? 'IS NOT NULL' : `LIKE '%${q}%'`}`;
        connection.query(sql,  (err, res)=>
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

const getAllRoomTable = (pageNumber = 0)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `SELECT * FROM roomtable  LIMIT 5 OFFSET ${pageNumber}`;
        connection.query(sql,  (err, res)=>
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
const recordQuantity  = ()=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `SELECT COUNT(*) FROM roomtable`;
        connection.query(sql,  (err, res)=>
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
module.exports= {getAllArea, insertArea, searchQuery, filterData, getAllRoomTable, recordQuantity}