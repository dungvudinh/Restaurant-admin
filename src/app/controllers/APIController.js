const {getListBooking, getListArea, getListTable, getListClient, insertBooking, getTableById, insertClient, getLastIdClient,
getLastIdBooking, updateBooking, deleteBooking, cancelBooking,
getListMenu, getListMenuGroup, updateTable, insertMenu, getListOrder, getLastIdOrder, getMenuById, updateOrder, getOrderById, 
updateOrderQuantity, deleteOrderMenu, insertOrder, updateOrderOther, updateTableStatus, deleteOrder}  = require('../models/api');


class APIController 
{
    async getListBooking(req,res)
    {
        try 
        {
            var {booking_code, status, table_id, timeline} = req.query;
            console.log(timeline);
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
            console.log(result)
            res.json(result)
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
            const areaId = req.query.area;
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
            const result = await getListClient(clientName);
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
            console.log(data)
            const result = await insertClient(data);
            console.log(result)
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
            console.log(result);
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
            console.log(req)
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
            console.log(result)
            res.json(result)
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
            console.log(data)
            console.log(req);
            const result = await insertMenu(data);
            console.log(result)
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
                    console.log(orderMenuParse)
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
            console.log(newOrderMenu)
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
            const orderMenuFilter = order.order_menu.map(orderMenuItem=>
            ({order_menu_id:orderMenuItem.order_menu_id,order_menu_note: orderMenuItem.order_menu_note,order_menu_quantity: orderMenuItem.order_menu_quantity }))
            order = {...order, order_menu: orderMenuFilter}
            console.log(order);
            const result = await insertOrder(order);
            console.log(result)
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
            const result = await updateOrderOther(order);
            console.log(result);
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
            console.log(req.body)
            const orderId = req.body.order_id;
            const result = await deleteOrder(orderId);
            console.log(result)
            res.json(result);
        }
        catch(error)
        {
            throw(error)
        }
    }
}
module.exports = new APIController;