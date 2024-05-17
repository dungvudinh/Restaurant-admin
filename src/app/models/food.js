const connection = require('../../config/db');
const getFirstMenu= ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = `SELECT menu.id, menu.name as menu_name , image_url, description,ingredient, menu_group.name as menu_group_name,menu_group_id, price, is_active FROM menu JOIN menu_group ON menu.menu_group_id = menu_group.id WHERE menu_type_id = 1 AND menu_group_id = 2 AND menu.deleted_at IS NULL LIMIT 5 OFFSET 0`;
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
                     resolve(res[0]);
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
        const ingredientJson = data.ingredient ? JSON.stringify(data.ingredient) : null;
        var sql = `INSERT INTO menu(name,image_url, description, menu_type_id,ingredient, menu_group_id, price ) VALUES (?)`;
        var value =[data.menu_name,imgPathJsons, data.menu_desc,1,ingredientJson, data.menu_group, data.menu_price ];
        connection.query(sql,[value], (err, res)=>{
            if(!err)
            {
                connection.query(`SELECT * FROM menu WHERE id = ${res.insertId}`, (error, result)=>{
                    if(!error)
                        resolve({
                            status:'success', 
                            data:result
                        })
                    else 
                        resolve({
                            status:'error', 
                            debug:err
                        })
                })
            }
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
        var sql = `SELECT COUNT(*) as recordQuantity FROM menu WHERE menu_group_id = ${id} AND menu_type_id = 1`;
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

const menuFilter = (id, page, search)=>
{
    return new Promise((resolve, reject)=>{
        
        var sql = `SELECT menu.id, menu.name as menu_name , image_url, description,ingredient, menu_group.name as menu_group_name, menu_group_id, price, is_active FROM menu JOIN menu_group ON menu.menu_group_id = menu_group.id WHERE menu_type_id = 1 AND menu_group_id = ${id} AND menu.name ${search ? `LIKE '%${search}%'` : 'IS NOT NULL'}  AND menu.deleted_at IS NULL LIMIT 5 OFFSET ${page}`;
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

const updateFood = (data)=>
{
    return new Promise((resolve, reject)=>{
        const imgPathJsons = data.image_url.length > 0 ? JSON.stringify(data.image_url) : null;
        const ingredientJson = data.ingredient ? JSON.stringify(data.ingredient) : null;
        console.log(data.ingredient )
        var sql = `UPDATE menu SET name = '${data.menu_name}', image_url = ${imgPathJsons == null ? 'NULL' : `'${imgPathJsons}'`}, description = '${data.menu_desc}', menu_type_id=1 , ingredient = ${ingredientJson == null ? 'NULL' : `'${ingredientJson}'`}, menu_group_id =${data.menu_group} ,price= ${data.menu_price}, updated_at = CURRENT_TIMESTAMP WHERE id = ${data.id}`;
        
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

const updateStatusFood = (data)=>
{
    return new Promise((resolve, reject)=>{
      
        var sql = `UPDATE menu SET is_active = ${data.status} WHERE id = ${data.menu_id}`;
        
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

const deleteFood = (id)=>
{
    return new Promise((resolve, reject)=>{
      
        var sql = `UPDATE menu SET deleted_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
        
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

const binFood = (menu_type)=>
{
    return new Promise((resolve, reject)=>{
      
        var sql = `SELECT menu.id, menu.name as menu_name, menu_group.name  as menu_group_name, price, is_active  FROM menu JOIN menu_group ON menu.menu_group_id = menu_group.id WHERE menu_type_id =  ${menu_type} AND menu.deleted_at IS NOT NULL`;
        
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
const deletePermFood = (id)=>
{
    return new Promise((resolve, reject)=>{
      
        var sql = `DELETE FROM menu WHERE id = ${id}`;
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

const restoreFood = (id)=>
{
    return new Promise((resolve, reject)=>{
      
        var sql = `UPDATE menu SET deleted_at = NULL WHERE id = ${id}`;
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
module.exports = {getFirstMenu, getIngredientById, getIngredient, insertFood, recordQuantity, menuFilter, updateFood, updateStatusFood, deleteFood,
 binFood, deletePermFood, restoreFood};