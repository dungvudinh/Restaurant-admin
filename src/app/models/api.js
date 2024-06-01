const connection = require('../../config/db');
const getListBooking  = (booking_code, statusConvert, table_id, timeline)=>{
    var {overtime, coming} = timeline;
    statusConvert = statusConvert.join(',');
    return new Promise((resolve, reject)=>{
        var sql = `SELECT booking.id as booking_id,time_unit, period_time,booking_time,DATE_FORMAT(booking_date, '%Y-%m-%d') as booking_date,
         booking_code,  booking.client_id, client.full_name,client.client_code,  phone_number,adult_quantity + children_quantity  as client_quantity,
        booking.table_id, booking_status, booking.note as booking_note,adult_quantity, children_quantity, table_id, client.email FROM booking JOIN client ON booking.client_id = client.id 
        WHERE booking_date = CURRENT_DATE  AND booking_status IN(${statusConvert !== '' ? statusConvert : '1,2,3,5'}) AND booking_code ${booking_code ? `LIKE '%${booking_code}%'` : 'IS NOT NULL'}
        AND booking_time ${overtime == 'true' ? ` < CURRENT_TIME` : 'IS NOT NULL'} AND booking_time ${coming == 'true' ? `> CURRENT_TIME` : 'IS NOT NULL'}`;
        connection.query(sql, (err, res)=>{
            if(!err)
            {
                if(table_id )
                {
                    var filterResult = res.filter(booking=>{
                        if(booking.table_id !== null)
                        {
                            var isMatch = JSON.parse(booking.table_id).some(tbl=>table_id.includes(tbl.toString()));
                            return isMatch;
                        }
                        else 
                            return false;
                        })
                    resolve(filterResult)
                }
                else 
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

const getListArea = ()=>{
    return new Promise((resolve, reject)=>{
        var sql = "SELECT * FROM area";
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
const getListTable = (areaId, name)=>{
    return new Promise((resolve, reject)=>{
        var sql = `SELECT * FROM roomtable WHERE  area  ${ areaId ? `= ${areaId}` : 'IS NOT NULL'} AND name ${ name ? ` LIKE '%${name}%'` : 'IS NOT NULL'} AND is_active = 1`;
        console.log(sql)
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
const getListClient = (client_name, client_id)=>
    {
        return new Promise((resolve, reject)=>{
            var sql =`SELECT * FROM client WHERE full_name ${ client_name ? ` LIKE '%${client_name}%'` : ' IS NOT NULL'} AND id ${client_id ? ` = ${client_id}` : 'IS NOT NULL'}`;
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
const insertBooking = (data)=>
{
    var bookingStatus = data.tables.length > 0 ? 2 : 1;
    var tableId = data.tables.length > 0 ? JSON.stringify(data.tables.map(table=>table.id)) : null;
    return new Promise((resolve, reject)=>{
        var sql =`INSERT INTO booking(booking_time, booking_date, adult_quantity,children_quantity,  period_time, time_unit,client_id, table_id,booking_status,note, booking_code) VALUE(?)`;
        var values= [data.booking_time, data.booking_date, data.adult_quantity, data.children_quantity, data.period_time, data.time_unit,data.client_id, tableId, bookingStatus,data.booking_note, data.booking_code ];
        connection.query(sql,[values],  (err, res)=>{
            if(!err)
                resolve({
                    status:'success', 
                    message:"Thêm đơn đặt bàn thành công"
                });
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}
const insertBookingFromClient = (data)=>
    {
        return new Promise((resolve, reject)=>{
            var sql =`INSERT INTO booking(booking_time, booking_date, adult_quantity,children_quantity,  period_time, time_unit,client_id,note, booking_code) VALUE(?)`;
            var values= [data.booking_time, data.booking_date, data.adult_quantity, data.children_quantity, data.period_time, data.time_unit,data.client_id,data.note, data.booking_code ];
            connection.query(sql,[values],  (err, res)=>{
                if(!err)
                    resolve({
                        status:'success', 
                        message:"Thêm đơn đặt bàn thành công"
                    });
                else 
                    resolve({
                        status:'error', 
                        debug:err
                    })
            })
        })
    }
const getLastIdClient = ()=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `SELECT id FROM client ORDER BY id DESC LIMIT 1`;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve(res[0])
                else 
                    resolve({
                        status:'error', 
                        debug:err
                    })
            })
        })
    }
const getTableById = (tableId)=>{
    return new Promise((resolve,reject)=>{
        var sql = `SELECT name, status FROM roomtable WHERE id = ${tableId}`;
        connection.query(sql, (err, res)=>{
            if(!err)
                resolve(res[0])
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}
const insertClient = (data)=>
{
    return new Promise((resolve,reject)=>{
        var sql = `INSERT INTO client(img_path, full_name, phone_number,client_code, birth_date, address, gender, email) VALUES(?)`;
        var values = [data.img_path, data.client_name, data.phone_number, data.client_code, data.birth_date !== '' ? data.birth_date : null,data.address  !== '' ? data.address : null,  data.gender !== '' ? data.gender: null, data.email !== '' ? data.email : null];
        connection.query(sql,[values],  (err, res)=>{
            if(!err){
                connection.query(`SELECT * FROM client WHERE id=${res.insertId}`, (error, result)=>{
                    if(!error)
                        resolve({
                            status: 'success', 
                            message:'Thêm khách hàng thành công', 
                            data: result[0]
                        })
                    else 
                    {
                        resolve({
                            status: 'error', 
                            message:'Lỗi không lấy được thông tin khách hàng sau khi thêm', 
                            debug:error
                        })
                    }
                })
            }
                
            else 
                resolve({
                    status:'error', 
                    message:'Thêm khách hàng thất bại', 
                    debug:err
                })
        })
    })
}
const insertClientFromClient = (data)=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `INSERT INTO client(full_name, phone_number, client_code) VALUES(?)`;
            var values = [data.full_name, data.phone_number, data.client_code];
            connection.query(sql,[values],  (err, res)=>{
                if(!err){
                    connection.query(`SELECT id FROM client WHERE id=${res.insertId}`, (error, result)=>{
                        if(!error)
                            resolve({
                                status: 'success', 
                                message:'Thêm khách hàng thành công', 
                                data: result[0].id
                            })
                        else 
                        {
                            resolve({
                                status: 'error', 
                                message:'Lỗi không lấy được thông tin khách hàng sau khi thêm', 
                                debug:error
                            })
                        }
                    })
                }
                    
                else 
                    resolve({
                        status:'error', 
                        message:'Thêm khách hàng thất bại', 
                        debug:err
                    })
            })
        })
    }
const getLastIdBooking = ()=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `SELECT id FROM booking ORDER BY id DESC LIMIT 1`;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve(res[0])
                else 
                    resolve({
                        status:'error', 
                        debug:err
                    })
            })
        })
    }
const updateBooking = (data)=>
    {
        var bookingStatus = data.tables.length > 0 ? 2 : 1;
        var tableId = data.tables.length > 0 ? JSON.stringify(data.tables.map(table=>table.id)) : null;
        return new Promise((resolve, reject)=>{
            var sql =`UPDATE booking SET booking_time = '${data.booking_time}', booking_date  =  '${data.booking_date}', adult_quantity = ${data.adult_quantity}, 
            children_quantity = ${data.children_quantity}, period_time = ${data.period_time}, time_unit = '${data.time_unit}', client_id = '${data.client_id}',
            table_id= ${tableId != null  ? `'${tableId}'` : null},booking_status = ${ bookingStatus}, note = '${data.booking_note}' WHERE booking_code = '${data.booking_code}'`;
            connection.query(sql,  (err, res)=>{
                if(!err)
                    resolve({
                        status:'success', 
                        message:"Cập nhập đơn đặt bàn thành công"
                    });
                else 
                    resolve({
                        status:'error', 
                        message:'Cập nhập đơn đặt bàn thất bại', 
                        debug:err
                    })
            })
        })
    }
const deleteBooking = (booking_code)=>
{
    return new Promise((resolve,reject)=>{
        var sql = `DELETE  FROM booking WHERE booking_code = '${booking_code}'`;
        connection.query(sql, (err, res)=>{
            if(!err)
                resolve({
                    status:'success', 
                    message:'Xóa đơn đặt bàn thành công', 
                    debug:err
                })
            else 
                resolve({
                    status:'error', 
                    message:'Xóa đơn đặt bàn thất bại', 
                    debug:err
                })
        })
    })
}
const cancelBooking = (booking_code)=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `UPDATE booking SET booking_status = 5  WHERE booking_code = '${booking_code}'`;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve({
                        status:'success', 
                        message:'Hủy đặt thành công', 
                        debug:err
                    })
                else 
                    resolve({
                        status:'error', 
                        message:'Hủy đặt không thành công', 
                        debug:err
                    })
            })
        })
    }
//CASHIER 
const getListMenu = (menu_group, search)=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `SELECT * FROM menu WHERE menu_group_id  ${menu_group  ? `= ${menu_group}` : 'IS NOT NULL'} AND name ${search ? `LIKE '%${search}%'` : 'IS NOT NULL'}`;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve(res)
                else 
                    resolve({
                        status:'error',     
                        debug:err
                    })
            })
        })
    }
const getListMenuGroup = (menu_group)=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `SELECT * FROM menu_group `;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve(res)
                else 
                    resolve({
                        status:'error',     
                        debug:err
                    })
            })
        })
    }
const updateTable = ({id,note})=>
    {
        return new Promise((resolve,reject)=>{
            var sql = `UPDATE roomtable SET note = '${note}' WHERE id =${id}`;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve({
                        status: 'success', 
                        message: 'Cập nhập ghi chú thành công'
                    })
                else 
                    resolve({
                        status:'error',     
                        debug:err, 
                        message: 'Cập nhập ghi chú thất bại'
                    })
            })
        })
    }
const insertMenu = (data)=>
    {
        const imgPathJson = data.img_path ? JSON.stringify(data.img_path) : null;
        return new Promise((resolve, reject)=>{
            var sql =`INSERT INTO menu(name, image_url,description, menu_group_id ,menu_type_id,  price) VALUE(?)`;
            var values= [data.menu_name,imgPathJson, data.menu_desc, data.menu_group_id, data.menu_type_id, data.menu_price];
            connection.query(sql,[values],  (err, res)=>{
                if(!err)
                    resolve({
                        status:'success', 
                        message:"Thêm thực đơn thành công"
                    });
                else 
                    resolve({
                        status:'error', 
                        message:'Thêm thực đơn thất bại.Tên thực đơn đã tồn tại', 
                        debug:err
                    })
            })
        })
    }
const getListOrder = ()=>{
        return new Promise((resolve,reject)=>{
            var sql = `SELECT order_menu.id, order_id, area.id as area, booking_code,client_id,client.full_name,client_code,phone_number, table_id, roomtable.name as table_name,
             order_menu.order_menu, client_quantity,order_menu.note as order_note, employee_id, booking_code, order_code  
             FROM order_menu LEFT JOIN roomtable ON order_menu.table_id  = roomtable.id LEFT JOIN area ON roomtable.area = area.id
             lEFT JOIN client ON order_menu.client_id = client.id
             WHERE order_menu.status = 1`;
            connection.query(sql, (err, res)=>{
                if(!err)
                    resolve(res)
                else 
                    resolve({
                        status:'error',     
                        debug:err, 
                        
                    })
            })
        })
}
const getLastIdOrder = ()=>{
    return new Promise((resolve,reject)=>{
        var sql = `SELECT order_id FROM order_menu ORDER BY id DESC LIMIT 1`;
        connection.query(sql, (err, res)=>{
            if(!err)
                resolve(res[0])
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}

const getMenuById = (menuId)=>{
    return new Promise((resolve,reject)=>{
        var sql = `SELECT name, price FROM menu WHERE id = ${menuId}`;
        connection.query(sql, (err, res)=>{
            if(!err)
                resolve(res[0])
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}
const updateOrder = (order_id, order_menu)=>{
    
    const orderMenuJson =JSON.stringify(order_menu);
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE order_menu SET order_menu ='${orderMenuJson}' WHERE id = ${order_id}`;
        connection.query(sql, (err, res)=>{
            if(!err)
            {
                resolve({
                    status:'success',
                    message: 'Cập nhập ghi chú đơn món thành công'
                })
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                    message: 'Cập nhập ghi chú đơn món thất bại'
                })
        })
    })
}
const getOrderById = (order_id)=>{
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM order_menu WHERE id = ${order_id}`;
        connection.query(sql, (err, res)=>{
            if(!err)
                resolve(res[0])
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}
const updateOrderQuantity = (orderId, orderMenu)=>{
    
    const orderMenuJson =JSON.stringify(orderMenu);
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE order_menu SET order_menu ='${orderMenuJson}' WHERE id = ${orderId}`;
        connection.query(sql, (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const deleteOrderMenu = (orderId, orderMenu)=>{
    
    const orderMenuJson =JSON.stringify(orderMenu);
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE order_menu SET order_menu = '${orderMenuJson}' WHERE id = ${orderId}`;
        connection.query(sql, (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const insertOrder = (order)=>{
    const orderMenuJson =JSON.stringify(order.order_menu);
    return new Promise((resolve,reject)=>{
        var sql = `INSERT INTO order_menu(client_id, table_id, order_menu, client_quantity, note,employee_id, booking_code, order_code, order_id) VALUES(?)`;
        var value = [order.client_id,order.table_id, orderMenuJson, order.client_quantity, order.note, order.employee_id, order.booking_code, order.order_code, order.order_id];
        connection.query(sql,[value],  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const updateOrderOther = (order)=>{
    const orderMenuJson =JSON.stringify(order.order_menu);
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE order_menu SET table_id = ${order.table_id}, booking_code = ${order.booking_code !== null ? `'${order.booking_code}'` : `${order.booking_code}`}, client_id = ${order.client_id},
        employee_id = ${order.employee_id}, client_quantity = ${order.client_quantity}, order_menu = '${orderMenuJson}' WHERE id  ${order.id !== null ? `=${order.id}` : 'IS NOT NULL'} AND order_code = '${order.order_code}'`;
       
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const deleteOrder = (orderId)=>{
    return new Promise((resolve,reject)=>{
        var sql = `DELETE FROM order_menu WHERE id = ${orderId}`;
       
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const deleteOrderByBooking = (bookingCode)=>{
    return new Promise((resolve,reject)=>{
        var sql = `DELETE FROM order_menu WHERE booking_code = '${bookingCode}'`;
       
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const updateTableStatus = ({table_id, status})=>{
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE roomtable SET status = ${status} WHERE id = ${table_id}`;
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const updateOrderNote = (order_id, order_note)=>{
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE order_menu SET note = '${order_note}' WHERE id = ${order_id}`;
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve({
                    status:'success',
                    message:'Cập nhập ghi chú order thành công'
                })
            }
            else 
                resolve({
                    status:'error', 
                    message:'Cập nhập ghi chú order thất bại', 
                    debug:err, 
                })
        })
    })
}

const getClientById = (client_id)=>{
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM client WHERE id = ${client_id}`;
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res[0])
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}

const updateStatusOrder = (id)=>{
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE order_menu SET order_menu.status =  2  WHERE id = ${id}`;
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve({
                    status:'success', 
                    message:'Thanh toán hóa đơn thành công'
                })
            }
            else 
                resolve({
                    status:'error', 
                    message:'Lỗi hệ thống.Thanh toán hóa đơn thất bại', 
                    debug:err, 
                })
        })
    })
}
const updateBookingStatus = (id, status, booking_code)=>{
    return new Promise((resolve,reject)=>{
        var sql = `UPDATE booking SET booking_status = ${status}  WHERE id  ${id ? `= ${id}` : 'IS NOT NULL'} AND booking_code ${booking_code ? ` = '${booking_code}'` : 'IS NOT NULL'}`;
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
const getListMenuClient = (menuTypeId, menuGroupId)=>{
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM menu WHERE menu_type_id=${menuTypeId} AND menu_group_id = ${menuGroupId} LIMIT 10`;
        connection.query(sql,  (err, res)=>{
            if(!err)
            {
                resolve(res)
            }
            else 
                resolve({
                    status:'error', 
                    debug:err, 
                })
        })
    })
}
module.exports = {getListBooking, getListArea, getListTable, getListClient, insertBooking, getTableById, 
    insertClient,getLastIdClient, getLastIdBooking, updateBooking, deleteBooking, cancelBooking
, getListMenu, getListMenuGroup, updateTable, insertMenu, getListOrder, getLastIdOrder, getMenuById, updateOrder, getOrderById,
 updateOrderQuantity, deleteOrderMenu, insertOrder, updateOrderOther,  updateTableStatus, deleteOrder, updateOrderNote, getClientById, 
 updateStatusOrder, updateBookingStatus, getListMenuClient, insertClientFromClient, insertBookingFromClient, deleteOrderByBooking};