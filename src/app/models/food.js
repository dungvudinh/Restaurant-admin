const connection = require('../../config/db');
const getMenuByGroupId = (id, page)=> 
{
    return new Promise((resolve, reject)=>{
        var sql = `SELECT * FROM menu WHERE menu_type_id = 1 AND menu_group_id = ${id} LIMIT 5 OFFSET ${page -1}`;
        connection.query(sql, (err, res)=>{
            if(!err)
                resolve(res);
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}

const getIngredientById = (id)=>
{
    // const ingredient = JSON.parse(ingredientJson);         
    return new Promise((resolve, reject)=>{
            
            connection.query(`SELECT * FROM ingredient WHERE id = ${id}`, (err, res)=>{
                if(!err)
                     resolve(res.map(item=>item.name));
                else 
                    resolve({
                        status:'error', 
                        debug:err
                    })
            })
        })
}

const getIngredient = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM ingredient";
        connection.query(sql, (err, res)=>{
            if(!err)
                 resolve(res);
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}

const insertFood = (data, imgPaths)=>
{
    return new Promise((resolve, reject)=>{
        const imgPathJsons = JSON.stringify(imgPaths);
        const ingredientJson = data.ingredient ? data.ingredient : null;
        var sql = `INSERT INTO menu(name,image_url, description, menu_type_id,ingredient, menu_group_id, price ) VALUES (?)`;
        var value =[data.menu_name,imgPathJsons, data.menu_desc,1, ingredientJson, data.menu_group, data.menu_price ];
        connection.query(sql,[value], (err, res)=>{
            if(!err)
                 resolve(res);
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}

const recordQuantity = (id)=>
{
    return new Promise((resolve, reject)=>{
        var sql = `SELECT COUNT(*) as recordQuantity FROM menu WHERE menu_group_id = ${id}`;
        connection.query(sql, (err, res)=>{
            if(!err)
                 resolve(res[0].recordQuantity);
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}
module.exports = {getMenuByGroupId, getIngredientById, getIngredient, insertFood, recordQuantity};