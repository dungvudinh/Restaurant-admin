const connection = require('../../config/db');



const getOrderCompleted = ()=>
{
    return new Promise((resolve, reject)=>
    {
        var sql = "SELECT COUNT(*)  as numOfOrderCompleted FROM booking WHERE booking_status= 6 AND booking_date = CURRENT_DATE";
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

const getTotalMoneyToday = ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT order_table.client_id , SUM(menu.price * order_table.quantity) as total FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id  = menu.id WHERE booking_status = 6 AND booking_date = CURRENT_DATE";
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



const getTotalMoneyYesterday = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT order_table.client_id , SUM(menu.price * order_table.quantity) as total FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id  = menu.id WHERE booking_status = 6 AND booking_date = CURRENT_DATE - INTERVAL 1 DAY"
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

const getTotalMoneyByHourToday = ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT SUM(menu.price * order_table.quantity) as total, HOUR(time_checkout) as hour FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id = menu.id WHERE time_checkout IS NOT NULL AND booking_date = CURRENT_DATE  GROUP BY HOUR(time_checkout)";
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

const getTotalMoneyByDayToday = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT booking_date as date,  SUM(menu.price * order_table.quantity) as total FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id  = menu.id   WHERE booking_date = CURRENT_DATE AND time_checkout IS NOT NULL GROUP BY DAY(booking_date);"
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
const getTotalMoneyByHourYesterday = ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT SUM(menu.price * order_table.quantity) as total, HOUR(time_checkout) as hour FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id = menu.id WHERE time_checkout IS NOT NULL AND booking_date = CURRENT_DATE - INTERVAL 1 DAY GROUP BY HOUR(time_checkout)";
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

const getTotalMoney7Day = ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT booking_date as date,  SUM(menu.price * order_table.quantity) as total FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id  = menu.id   WHERE booking_date > CURRENT_DATE - INTERVAL 7 DAY AND booking_date < CURRENT_DATE AND time_checkout IS NOT NULL GROUP BY DAY(booking_date);";
        connection.query(sql, (err, res)=>{
            if(!err){
                resolve(res);

            }
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}
const getTotalMoneyByHour7Day = ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT SUM(menu.price * order_table.quantity) as total, HOUR(time_checkout) as hour FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id = menu.id WHERE time_checkout IS NOT NULL AND booking_date > CURRENT_DATE - INTERVAL 7 DAY AND booking_date < CURRENT_DATE  GROUP BY HOUR(time_checkout)";
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
const getTotalMoneyServed = ()=>{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT order_table.client_id , SUM(menu.price * order_table.quantity) as total FROM booking JOIN order_table ON booking.client_id = order_table.client_id JOIN menu ON order_table.menu_id  = menu.id WHERE booking_status = 3"
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
const getOrderBeingServed = ()=> 
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT COUNT(*) as orderServed FROM booking WHERE booking_status = 3 ";
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

const getTotalClientToday = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT COUNT(*) as totalClient FROM booking WHERE booking_status != 5 AND booking_status != 4 AND booking_date  = CURRENT_DATE";
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

const getTotalClientYesterday  = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT COUNT(*)  as totalClient FROM `booking` WHERE booking_date = CURRENT_DATE - INTERVAL 1 DAY ";
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

const getClientQuantityToday  = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT COUNT(*) as quantity, HOUR(booking_time) as hour FROM booking WHERE booking_date = CURRENT_DATE AND time_checkout IS NOT NULL GROUP BY HOUR(booking_time)";
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

const getClientQuantityYesterday  = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT COUNT(*) as quantity, HOUR(booking_time) as hour FROM booking WHERE booking_date = CURRENT_DATE - INTERVAL 1 DAY AND time_checkout IS NOT NULL GROUP BY HOUR(booking_time)";
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

const getClientQuantity7Day  = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT COUNT(*) as quantity, HOUR(booking_time) as hour FROM booking WHERE booking_date > CURRENT_DATE - INTERVAL 7 DAY AND booking_date < CURRENT_DATE AND time_checkout IS NOT NULL GROUP BY HOUR(booking_time)";
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

const getTop10MenuToday = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT order_table.menu_id,menu.name,  SUM(order_table.quantity) as total_quantity FROM order_table JOIN menu ON order_table.menu_id = menu.id WHERE date(order_table.created_at) = CURRENT_DATE GROUP BY order_table.menu_id ORDER BY SUM(order_table.quantity) DESC LIMIT 10";
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
const getTop10MenuYesterday = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT order_table.menu_id as menu_id, menu.name, SUM(order_table.quantity) as total_quantity FROM order_table JOIN menu ON order_table.menu_id = menu.id WHERE date(order_table.created_at) = CURRENT_DATE - INTERVAL 1 DAY GROUP BY order_table.menu_id ORDER BY SUM(order_table.quantity) DESC LIMIT 10";
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
const getTop10Menu7Day = ()=>
{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT order_table.menu_id as menu_id, menu.name, SUM(order_table.quantity) as total_quantity FROM order_table JOIN menu ON order_table.menu_id = menu.id WHERE date(order_table.created_at) > CURRENT_DATE - INTERVAL 7 DAY AND date(order_table.created_at) < CURRENT_DATE GROUP BY order_table.menu_id ORDER BY SUM(order_table.quantity) DESC LIMIT 10";
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
module.exports = {getOrderCompleted, getTotalMoneyToday, getTotalMoneyYesterday,getOrderBeingServed,getTotalMoneyServed,  
getTotalClientToday,getTotalClientYesterday, getTotalMoneyByHourYesterday, getTotalMoney7Day, getTotalMoneyByHourToday,
getTotalMoneyByDayToday, getTotalMoneyByHour7Day, getClientQuantityToday, getClientQuantityYesterday, 
getClientQuantity7Day, getTop10MenuToday, getTop10MenuYesterday, getTop10Menu7Day};