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
            {
                connection.query(`SELECT  * FROM area WHERE id = ${res.insertId}`, (error, result)=>{
                    if(!error)
                        resolve(result);
                })
            }
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
        console.log(status)
        console.log(area);
        var sql = `SELECT * FROM roomtable WHERE area ${area == 'all' ? 'IS NOT NULL' : `LIKE '%${area}%'`} AND status ${status =='all' ? 'IS NOT NULL' : `= 0`} AND name ${(q == null || q== '') ? 'IS NOT NULL' : `LIKE '%${q}%'`} AND deleted_at IS NULL`;
        console.log(sql)
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
        var sql = `SELECT * FROM roomtable  WHERE deleted_at IS NULL `;
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
        var sql = `SELECT COUNT(*) as recordQuantity FROM roomtable`;
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
const insertRoomTable = (data)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = "INSERT INTO roomtable (name, area,chair_quantity, note, status) VALUES(?)";
        var values = [data.name, data.area, data.chair_quantity, data.note, 1];
        connection.query(sql,[values],  (err, res)=>
        {
            if(!err)
            {
                connection.query(`SELECT * FROM roomtable WHERE id = ${res.insertId}`, (error, result)=>
                {
                    if(!error)
                    resolve({
                        status:'success', 
                        data:result
                    });
                })
            }
            else 
                resolve({
                    status:"error", 
                    message: "Error getting data", 
                    debug:err
                })
        })
    })
}
const updateRoomTable = (data)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `UPDATE roomtable SET name = '${data.name}', area =${data.area}, chair_quantity=${data.chair_quantity}, note='${data.note}', status='${data.status}' WHERE id= ${data.id}`;
        connection.query(sql, (err, res)=>
        {
            if(!err)
            {
                connection.query(`SELECT * FROM roomtable WHERE id = ${data.id}`, (error, result)=>{
                    if(!error)
                        resolve({
                            status:'success', 
                            data:result
                        });
                    else 
                        resolve({
                            status:"error", 
                            message: "Error getting data", 
                            debug:err
                        })  
                })
            }
            else 
                resolve({
                    status:"error", 
                    message: "Error getting data", 
                    debug:err
                })  
        })
    })
}
const getHistoryByTableId = (tableId)=>
{
    return new Promise((resolve, reject)=>
    {
        // var sql = `SELECT order_code, DATE(created_at), employee_id, full_name, total FROM table_history JOIN client ON table_history.client_id = client.id WHERE table_id = ${tableId}`;
        var sql = `SELECT GROUP_CONCAT(order_menu SEPARATOR ',')  as order_menus, client.full_name as client_name, DATE(created_at) as date, order_code, user.full_name  as employee_name FROM order_menu 
        JOIN client ON order_menu.client_id = client.id  JOIN user ON employee_id = user.id WHERE table_id = ${tableId} GROUP BY order_menu.client_id `;
        connection.query(sql,  (err, res)=>
        {
            if(!err)
                resolve({
                    status:'success', 
                    data: res
                });
            else 
                resolve({
                    status:"error", 
                    message: "Error getting data", 
                    debug:err
                })
        })
    })
}

const deleteTable = (tableName)=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = `UPDATE roomtable SET deleted_at = CURRENT_TIMESTAMP WHERE name LIKE '%${tableName}%'`;
        connection.query(sql,  (err, res)=>
        {
            if(!err)
                resolve({
                    status:'success', 
                    data: res
                });
            else 
                resolve({
                    status:"error", 
                    message: "Error getting data", 
                    debug:err
                })
        })
    })
}
module.exports= {getAllArea, insertArea, searchQuery, filterData, getAllRoomTable, recordQuantity, 
    insertRoomTable,updateRoomTable, getHistoryByTableId, deleteTable}