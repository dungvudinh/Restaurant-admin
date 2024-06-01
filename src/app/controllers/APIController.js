const {getListBooking, getListArea, getListTable, getListClient, insertBooking, getTableById, insertClient, getLastIdClient,
getLastIdBooking, updateBooking, deleteBooking, cancelBooking,
getListMenu, getListMenuGroup, updateTable, insertMenu, getListOrder, getLastIdOrder, getMenuById, updateOrder, getOrderById, 
updateOrderQuantity, deleteOrderMenu, insertOrder, updateOrderOther, updateTableStatus, deleteOrder, updateOrderNote, getClientById, 
updateStatusOrder, updateBookingStatus, getListMenuClient, insertClientFromClient, insertBookingFromClient, deleteOrderByBooking}  = require('../models/api');
const {login, changePassword, resetPassword} = require('../models/account');
const jwt = require('jsonwebtoken');
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
console.log(process.env.ACCOUNT_SID)
class APIController 
{
    async getListBooking(req,res)
    {
        try 
        {
            var {booking_code, status, table_id, timeline} = req.query;
            var statusConvert =[];
            if(status.waiting == 'true')
                statusConvert.push(1)
            if(status.sorted == 'true')
                statusConvert.push(2)
            if(status.accepted == 'true')
                statusConvert.push(3)
            if(status.canceled == 'true')
                statusConvert.push(5)
            var result = await getListBooking(booking_code,statusConvert, table_id, timeline);
            console.log(result);
            var response = await result.map(async (dataItem)=>{
                var tableObj = null;
                if(dataItem.table_id != null)
                {
                    tableObj = JSON.parse(dataItem.table_id).map(async (tableId)=>{
                        return await getTableById(tableId);
                    })
                }
                
                var data = tableObj != null ?  await Promise.all(tableObj) : null;
                return {...dataItem, table:data, table_id: JSON.parse(dataItem.table_id)}      
            })
            const dataConvert =  await Promise.all(response);
            console.log(dataConvert);
            res.json(dataConvert);
        }
        catch(error)
        {
            throw(error);
        }
    }
    async insertBooking(req, res)
    {
        try 
        {
            const result = await insertBooking(req.body);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getLastIdClient(req,res)
    {
        try 
        {
           
            const result = await getLastIdClient();
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getLastIdBooking(req,res)
    {
        try 
        {
            const result = await getLastIdBooking();
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getListArea(req, res)
    {
        try 
        {
            var result = await getListArea();
            res.json(result);
        }
        catch(error)
        {
            throw(error);
        }
    }
    async getListTable(req, res)
    {
        try 
        {
            const areaId = req.query.area_id;
            const name = req.query.q;
            var result = await getListTable(areaId, name);
            res.json(result);
        }
        catch(error)
        {
            throw(error);
        }
    }
    async getListClient(req, res)
    {
        try 
        {
            const clientName = req.query.name;
            const clientId = req.query.id;
            const result = await getListClient(clientName, clientId);
            res.json(result);
        }
        catch(error)
        {
            throw(error);
        }
    }
    async newClient(req,res)
    {
        try 
        {
            var data ={...req.body, 'img_path': req.file ? req.file.path : null}
            const result = await insertClient(data);
            res.json(result);
            // if(req.file)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateBooking(req, res)
    {
        try 
        {
            const result = await updateBooking(req.body);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async deleteBooking(req, res)
    {
        try 
        {
            const result = await deleteBooking(req.body.booking_code);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async cancelBooking(req, res)
    {
        try 
        {
            const result = await cancelBooking(req.body.data.booking_code);
        }
        catch(error)
        {
            throw(error)
        }
    }
    //cashier 
    async getListMenu(req, res)
    {
        try 
        {
            var menuGroupId = req.query.menu_group;
            var search =  req.query.q;
            const result = await getListMenu(menuGroupId, search);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getListMenuGroup(req, res)
    {
        try 
        {
            const result = await getListMenuGroup();
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateTable(req, res)
    {
        try 
        {
            const result = await updateTable(req.body);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async insertMenu(req,res)
    {
        try 
        {
            var data ={...req.body, 'img_path': req.files ? req.files.map(file=>file.path) : null}
            const result = await insertMenu(data);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getListOrder(req, res)
    {
        try 
        {
            const result = await getListOrder();
            // var orderMenu = JSON.parse(result.order_menu);
            var response = await result.map(async (dataItem)=>{
                var orderMenu = null;
                if(dataItem.order_menu != null)
                {
                    var orderMenuParse = JSON.parse(dataItem.order_menu);
                    if(orderMenuParse.length > 0)
                        orderMenu = JSON.parse(dataItem.order_menu).map(async (orderMenuObj)=>{
                            const menuName =  await getMenuById(orderMenuObj.order_menu_id);
                            return {...orderMenuObj, order_menu_name: menuName.name, order_menu_price:menuName.price }
                        })
                    else 
                        orderMenu = orderMenuParse;
                }
                
                var data = orderMenu != null ?  await Promise.all(orderMenu) : null;
                return {...dataItem, order_menu:data}      
            })
            const dataConvert =  await Promise.all(response);
            res.json(dataConvert);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getLastIdOrder(req, res)
    {
        try 
        {
            const result = await getLastIdOrder();
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateOrder(req, res)
    {
        try 
        {
            
            const orderMenuId = req.body.order_menu.order_menu_id;
            const orderMenuNote = req.body.order_menu.order_menu_note;
            const order = await getOrderById(req.body.order_id);
            const order_menu = JSON.parse(order.order_menu);
         
            const newOrderMenu = order_menu.map(orderMenuItem=>{
                if(orderMenuItem.order_menu_id === orderMenuId){
                    orderMenuItem.order_menu_note = orderMenuNote;
                    return orderMenuItem;
                }
                else 
                    return orderMenuItem;
            })
            const result = await updateOrder(req.body.order_id,newOrderMenu );
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateOrderQuantity(req, res)
    {
        try 
        {
            const {order_id, order_menu_id, order_menu_quantity} = req.body;
            const order = await getOrderById(order_id);
            const orderMenu = JSON.parse(order.order_menu);
            const newOrderMenu = orderMenu.map(orderMenuItem=>{
                if(orderMenuItem.order_menu_id === order_menu_id){
                    orderMenuItem.order_menu_quantity = order_menu_quantity;
                    return orderMenuItem;
                }
                else 
                    return orderMenuItem;
            })
            const result = await updateOrderQuantity(order_id,newOrderMenu);
            res.json(result)
        }
        catch(error)    
        {
            throw(error)
        }
    }
    async deleteOrderMenu(req, res){
        try 
        {
            const orderMenuId = req.body.order_menu_id;
            const orderId = req.body.order_id;
            const order = await getOrderById(orderId);
            const orderMenu = JSON.parse(order.order_menu);
            const newOrderMenu = orderMenu.filter(orderMenuItem=>orderMenuItem.order_menu_id !== orderMenuId);
            const result = await deleteOrderMenu(orderId,newOrderMenu);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async insertOrder(req, res)
    {
        try 
        {
            var order = req.body; 
            var orderMenuFilter;
            if(order.order_menu.length > 0){
                orderMenuFilter = order.order_menu.map(orderMenuItem=>
                 ({order_menu_id:orderMenuItem.order_menu_id,order_menu_note: orderMenuItem.order_menu_note,order_menu_quantity: orderMenuItem.order_menu_quantity }))
            }
            else 
                orderMenuFilter = order.order_menu;
            order = {...order, order_menu: orderMenuFilter}
            const result = await insertOrder(order);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateOther(req, res)
    {
        try 
        {
            
            var order = req.body;
            const orderMenu = order.order_menu.map(orderMenuItem=>
            ({order_menu_id:orderMenuItem.order_menu_id,order_menu_note: orderMenuItem.order_menu_note,order_menu_quantity: orderMenuItem.order_menu_quantity }))
            order= {...order, order_menu:orderMenu};
            console.log(order);
            const result = await updateOrderOther(order);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateTableStatus(req, res)
    {
        try {
            const result = await updateTableStatus(req.body);
            res.json(result)
        }
        catch(error){
            throw(error)
        }
    }
    async deleteOrder(req, res)
    {
        try 
        {
            const orderId = req.body.order_id;
            const result = await deleteOrder(orderId);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async authentication(req, res)
    {
        try 
        {
            const result  = await login(req.body);
            if(result.status == 'success')
                res.cookie('client_token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.json(result);
                
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async changePasswordAuthen(req, res){
        try 
        {
            const result  = await changePassword(req.body);
            if(result.status == 'success')
                res.cookie('client_token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.json(result);
                
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async resetPasswordAuthen(req,res){
        try {
            const result  = await resetPassword(req.body);
            if(result.status == 'success')
                res.cookie('client_token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            res.json(result);
        }
        catch(error){
            console.log(error);
        }
    }
    logout(req, res)
    {
        res.clearCookie('client_token');
        res.json({
            status:'success',
            message:'Đăng xuất thành công'
        })
    }
    async verifyAccount(req, res, next){
        try 
        {
            const token = req.cookies.client_token;
            if(!token)
                 return res.json({
                    status:'error', 
                    message: 'Bạn chưa xác thực'
                 });
            else 
                jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
                    if(err)
                        return res.json({
                            status:'error', 
                            message:'Xác thực thông tin thất bại'
                        })
                    else 
                    {
                        req.info_user= decode;
                        next();
                    }
                })
        }
        catch(error)
        {
            throw(error);
        }
    }
    async reception(req, res){
        try 
        {
            return res.json({
                status:'success',
                info_user: req.info_user
            })
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getUser(req, res){
        try 
        {
            return res.json({
                status:'success',
                info_user: req.info_user
            })
        }
        catch(error)
        {
            throw(error)
        }
    }
    async cashier(req, res){
        try 
        {
            return res.json({
                status:'success',
                info_user: req.info_user
            })
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateOrderNote(req, res)
    {
        try {
            const result = await updateOrderNote(req.body.id, req.body.note);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getClientById(req, res)
    {
        try{
            const result =  await getClientById(req.query.id);
            res.json(result)
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateOrderStatus(req, res)
    {
        try{
            const result  = await updateStatusOrder(req.body.id);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async updateBookingStatus(req, res){
        try 
        {
            const result  = await updateBookingStatus(req.body.id, req.body.status, req.body.booking_code);
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
    async getListMenuClient(req,res){
        try 
        {
            const result = await getListMenuClient(req.query.menu_type_id, req.query.menu_group_id);
            res.json(result)
        }
        catch(error){
            throw(error)
        }
    }
    async newClientFromClient(req,res){
        try 
        {
            const result = await insertClientFromClient(req.body);
            res.json(result)
        }
        catch(error){
            throw(error)
        }
    }
    async newBookingFromClient(req,res){
        try 
        {
            const result = await insertBookingFromClient(req.body);
            res.json(result)
        }
        catch(error){
            throw(error)
        }
    }
    async deleteOrderByBooking(req, res){
        try {
            const result  = await deleteOrderByBooking(req.body.booking_code)
            res.json(result);
        }
        catch(error){
            throw(error)
        }
    }
    async testSMS(req, res){
        try 
        {
            let msgOption = {
                from: '+13852009345', 
                to: '+84559507343',
                body:"Hey this is message from server"
            }
            const message = await client.messages.create(msgOption);
            console.log(message)
            res.json(message);
        }
        catch(error){
            console.log(error)
        }
       
    }
}
module.exports = new APIController;