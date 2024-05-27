const {getOrderCompleted, getTotalMoneyToday,getTotalMoneyYesterday, getOrderBeingServed, 
    getTotalClientToday,getTotalClientYesterday,getTotalMoneyServed, getTotalMoneyByHourYesterday,
    getTotalMoney7Day, getTotalMoneyByHourToday,  getTotalMoneyByHour7Day, getClientQuantityToday, 
    getClientQuantityYesterday, getClientQuantity7Day, getTop10MenuToday, getTop10MenuYesterday, 
    getTop10Menu7Day, getMenuPriceById, getMenuNameById}  = require('../models/dashboard');

const {getAllArea, insertArea, searchQuery, filterData, getAllRoomTable, recordQuantity
, insertRoomTable, updateRoomTable, getHistoryByTableId, deleteTable} = require('../models/roomTable');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs')
// APP INFO
const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};


class SiteController 
{
     async dashboard(req,res)
    {
        try 
        {
            const arrayRegex = /\[([^[\]]+)]/g;
            var orderCompleted = await getOrderCompleted();
            var orderToday = await getTotalMoneyToday();
            var totalMoneyToday  = 0;
            if(orderToday.length > 0){
                totalMoneyToday = await orderToday.reduce(async(stored, orderItem)=>{
                    var orderItemParse = JSON.parse(orderItem.order_menu);
                    var total = await orderItemParse.reduce(async (acc, orderMenuItem)=>{
                        var menuPrice = await getMenuPriceById(orderMenuItem.order_menu_id);
                        return await acc + menuPrice[0].price;
                    }, 0)
                      
                    return await stored + total;
                }, 0)
            }
            var orderYesterday = await getTotalMoneyYesterday();
            var totalMoneyYesterday = 0;
            if(orderYesterday.length > 0){
                totalMoneyYesterday = await orderYesterday.reduce(async(stored, orderItem)=>{
                    var orderItemParse = JSON.parse(orderItem.order_menu);
                    var total = await orderItemParse.reduce(async (acc, orderMenuItem)=>{
                        var menuPrice = await getMenuPriceById(orderMenuItem.order_menu_id);
                        return await acc + menuPrice[0].price;
                    }, 0)
                      
                    return await stored + total;
                }, 0)
            }
            var orderServed = await getOrderBeingServed();
            var order = await getTotalMoneyServed();
            var totalMoneyServed = 0;
            if(order.length > 0){
                totalMoneyServed = await order.reduce(async(stored, orderItem)=>{
                    var orderItemParse = JSON.parse(orderItem.order_menu);
                    var total = await orderItemParse.reduce(async (acc, orderMenuItem)=>{
                        var menuPrice = await getMenuPriceById(orderMenuItem.order_menu_id);
                        return await acc + menuPrice[0].price;
                    }, 0)
                    return await stored + total;
                }, 0)
            }
            
            var totalClientToday = await getTotalClientToday();
            var totalClientYesterday = await getTotalClientYesterday();
            let match2;
            var orderByHourYesterday =  await getTotalMoneyByHourYesterday();
            var totalMoneyByHourYesterday = orderByHourYesterday.map(async (orderItem)=>{
                const arrayParent= [];
                while ((match2 =arrayRegex.exec(orderItem.order_menus)) !== null) {
                    arrayParent.push(JSON.parse(match2[0]))
                }
                var hour   = orderItem.hour;
                var total  = await arrayParent.reduce(async (acc, array)=>{
                    //mỗi array đại diện cho 1 nhóm ngày
                        var totalChild = await array.reduce(async (total, arrayChild)=>{
                            
                            var menuPrice = await getMenuPriceById(arrayChild.order_menu_id);
                            return await total + menuPrice[0].price;
                        }, 0)
                        
                        return await acc + totalChild;
                }, 0)
                return {hour, total}
            })
            totalMoneyByHourYesterday = await Promise.all(totalMoneyByHourYesterday);
            var order7day = await getTotalMoney7Day();
            let match;
            var totalMoney7Day = order7day.map(async (orderItem)=>{
                const arrayParent= [];
                while ((match =arrayRegex.exec(orderItem.order_menus)) !== null) {
                    arrayParent.push(JSON.parse(match[0]))
                }
                var date   = orderItem.date;
                var total  = await arrayParent.reduce(async (acc, array)=>{
                    //mỗi array đại diện cho 1 nhóm ngày
                        var totalChild = await array.reduce(async (total, arrayChild)=>{
                            
                            var menuPrice = await getMenuPriceById(arrayChild.order_menu_id);
                            return await total + menuPrice[0].price;
                        }, 0)
                        
                        return await acc + totalChild;
                }, 0)
                return {date, total}
            })
            totalMoney7Day = await Promise.all(totalMoney7Day)

            var orderByHourToday = await getTotalMoneyByHourToday();
            var totalMoneyByHourToday = orderByHourToday.map(async (orderItem)=>{
                const arrayParent= [];
                while ((match =arrayRegex.exec(orderItem.order_menus)) !== null) {
                    arrayParent.push(JSON.parse(match[0]))
                }
                var hour   = orderItem.hour;
                var total  = await arrayParent.reduce(async (acc, array)=>{
                    //mỗi array đại diện cho 1 nhóm ngày
                        var totalChild = await array.reduce(async (total, arrayChild)=>{
                            
                            var menuPrice = await getMenuPriceById(arrayChild.order_menu_id);
                            return await total + menuPrice[0].price;
                        }, 0)
                        
                        return await acc + totalChild;
                }, 0)
                return {hour, total}
            })
            totalMoneyByHourToday = await Promise.all(totalMoneyByHourToday);
            var orderByHour7Day = await getTotalMoneyByHour7Day();
            var totalMoneyByHour7Day = orderByHour7Day.map(async (orderItem)=>{
                const arrayParent= [];
                while ((match =arrayRegex.exec(orderItem.order_menus)) !== null) {
                    arrayParent.push(JSON.parse(match[0]))
                }
                var hour   = orderItem.hour;
                var total  = await arrayParent.reduce(async (acc, array)=>{
                    //mỗi array đại diện cho 1 nhóm ngày
                        var totalChild = await array.reduce(async (total, arrayChild)=>{
                            
                            var menuPrice = await getMenuPriceById(arrayChild.order_menu_id);
                            return await total + menuPrice[0].price;
                        }, 0)
                        return await acc + totalChild;
                }, 0)
                return {hour, total}
            })
            totalMoneyByHour7Day = await Promise.all(totalMoneyByHour7Day);
            var clientQuantityToday = await getClientQuantityToday();
            var clientQuantityYesterday = await getClientQuantityYesterday();
            var clientQuantity7Day = await getClientQuantity7Day();
            var orderMenuToday  = await getTop10MenuToday();

            async function getTop10Menu(orderMenu){
                var top10Menu = {};
                orderMenu.forEach(item=>{
                    JSON.parse(item.order_menu).forEach(order=>{
                        top10Menu[order.order_menu_id] = (top10Menu[order.order_menu_id] || 0 ) + order.order_menu_quantity;
                    })
                })
                var topOrderMenuIds = [];
                for(var i =0; i<10; i++){
                    var maxQuantity = 0;
                    var topOrderMenuId = null;
                    for(var order_menu_id in top10Menu){
                        if(top10Menu.hasOwnProperty(order_menu_id)){
                            if(top10Menu[order_menu_id] > maxQuantity && !topOrderMenuIds.some(obj => obj.menu_id === order_menu_id)){
                                maxQuantity = top10Menu[order_menu_id];
                                topOrderMenuId = order_menu_id;
                            }
                        }
                    }
                    if(topOrderMenuId !== null){
                        topOrderMenuIds.push({ menu_id: topOrderMenuId, total_quantity: maxQuantity });
                    }
                }
                const result =  await topOrderMenuIds.map(async (orderMenuItem)=>{
                    var orderMenuName = await getMenuNameById(orderMenuItem.menu_id);
                    return {name:orderMenuName, total_quantity: orderMenuItem.total_quantity }
                })
                return await Promise.all(result)
            }
            const top10MenuToday  = await getTop10Menu(orderMenuToday);
            var orderMenuYesterday = await getTop10MenuYesterday();
            var top10MenuYesterday = await getTop10Menu(orderMenuYesterday)
            var orderMenu7Day = await getTop10Menu7Day();
            var top10Menu7Day = await getTop10Menu(orderMenu7Day)
            res.render('dashboard',{
                numOfOrderCompleted:orderCompleted.length > 0 ? orderCompleted[0].numOfOrderCompleted : 0, 
                totalMoneyToday,
                totalMoneyYesterday,
                totalServing: orderServed.length > 0 ? orderServed[0].orderServed : 0, 
                totalClientToday: totalClientToday.length > 0 ? totalClientToday[0].totalClient : 0, 
                totalClientYesterday:totalClientYesterday.length > 0 ?  totalClientYesterday[0].totalClient : 0, 
                totalMoneyServed,
                totalMoneyByHourYesterday:JSON.stringify(totalMoneyByHourYesterday), 
                totalMoney7Day:JSON.stringify(totalMoney7Day.map(data=> ({total: data.total, date: data.date.toString()}))), 
                totalMoneyByHour7Day:JSON.stringify(totalMoneyByHour7Day),
                totalMoneyByHourToday: JSON.stringify(totalMoneyByHourToday), 
                clientQuantityToday: JSON.stringify(clientQuantityToday), 
                clientQuantityYesterday:JSON.stringify(clientQuantityYesterday), 
                clientQuantity7Day: JSON.stringify(clientQuantity7Day), 
                top10MenuToday: JSON.stringify(top10MenuToday), 
                top10MenuYesterday: JSON.stringify(top10MenuYesterday), 
                top10Menu7Day: JSON.stringify(top10Menu7Day)
            });
        }
        catch(error)
        {
            console.log(error);
        }

    }
    async roomTable(req, res)
    {
        try 
        {
            const listArea = await getAllArea();
            const listRoomTable = await getAllRoomTable();
            console.log(listRoomTable)
            var recordNumber = await recordQuantity();
            res.render('room-table', {
                listArea, 
                listRoomTable, 
                pageQuantity: Math.ceil(recordNumber[0].recordQuantity/4)
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async filterData(req, res)
    {
        try 
        {
            console.log(req.query.status);
            const result  =  await filterData(req.query.status, req.query.area, req.query.q);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async newArea(req, res)
    {
        try 
        {
            const data = await insertArea(req.body);
            console.log(data);
            res.json(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async newRoomTable(req,res)
    {
        try 
        {
            const result = await insertRoomTable(req.body);
            console.log(result)
            res.json(result);
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async updateRoomTable(req, res)
    {
        try 
        {
            console.log(req.body)
            const result = await updateRoomTable(req.body);
            res.json(result);   
            
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async tableHistory(req, res)
    {
        try 
        {
            console.log(req.query);
            const arrayRegex = /\[([^[\]]+)]/g;
            let match;
            var result = await getHistoryByTableId(req.query.tableId);
            console.log(result);
            var resultFormat = result.data.map(async (orderItem)=>{
                const arrayParent= [];
                while ((match =arrayRegex.exec(orderItem.order_menus)) !== null) {
                    arrayParent.push(JSON.parse(match[0]))
                }
                var total  = await arrayParent.reduce(async (acc, array)=>{
                    //mỗi array đại diện cho 1 nhóm ngày
                        var totalChild = await array.reduce(async (total, arrayChild)=>{
                            
                            var menuPrice = await getMenuPriceById(arrayChild.order_menu_id);
                            return await total + menuPrice[0].price;
                        }, 0)
                        
                        return await acc + totalChild;
                }, 0)
                return {...orderItem, total}
            })
            resultFormat = await Promise.all(resultFormat);
            console.log(resultFormat)
            // if(result.status == 'success')
            //         result = {status:result.status, data: result.data.map(item=>())}
            res.json(resultFormat);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async deleteTable(req, res)
    {
        try 
        {
            var result = await deleteTable(req.query.tableName);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async login(req ,res)
    {
        try 
        {
            res.render('login', {layout:'login'})
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async logout(req ,res)
    {
        try 
        {
            res.clearCookie('token');
            res.redirect('/login')
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async signup(req ,res)
    {
        try 
        {
            res.render('signup', {layout:'login'})
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async verifyAccount(req,res, next)
    {
        try 
        {

            const token = req.cookies.token;
            if(!token)
                // return res.json({message:'Phiên đăng nhập đã hết hạn.Vui lòng đăng nhập lại'})
                return res.redirect('/login');
            else 
                jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
                    if(err)
                        return res.json({message:'Xác thực thông tin thất bại'})
                    else 
                    {
                        req.name = decode.name;
                        next();
                    }
                })
        }
        catch(error)
        {
            throw(error);
        }
    }
    async payment(req, res){
        try 
        {
            const amount = req.body.amount;
            const embed_data = {
                // redirecturl: 'http://localhost:3001/cashier'
            };

            const items = [{}];
            const transID = Math.floor(Math.random() * 1000000);
            const order = {
                app_id: config.app_id,
                app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
                app_user: "user123",
                app_time: Date.now(), // miliseconds
                item: JSON.stringify(items),
                embed_data: JSON.stringify(embed_data),
                amount: amount,
                description: `Lazada - Payment for the order #${transID}`,
                bank_code: "",
                callback_url:'https://c10e-116-99-44-31.ngrok-free.app/callback'
            };

            // appid|app_trans_id|appuser|amount|apptime|embeddata|item
            const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
            order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
            const response = await axios.post(config.endpoint, null, { params: order });
            console.log("DATA: ", response.data);
            res.json(response.data);
        }
        catch(error){
           console.log(error.message)
        }
    }
    async callback(req,res){
        let result = {};

        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
            console.log("mac =", mac);


            // kiểm tra callback hợp lệ (đến từ ZaloPay server)
            if (reqMac !== mac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
            }
            else {
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

            result.return_code = 1;
            result.return_message = "success";
            console.log(result);
            res.json(result);
            }
        } catch (ex) {
            result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
            result.return_message = ex.message;
        }
    }
    async orderStatus(req,res){
        try 
        {
            const app_trans_id = req.params.app_trans_id;
            let postData = {
                app_id: config.app_id,
                app_trans_id: app_trans_id, // Input your app_trans_id
            }
            
            let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
            postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
            
            
            let postConfig = {
                method: 'post',
                url: 'https://sb-openapi.zalopay.vn/v2/query',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(postData)
            };
            const result = await axios(postConfig);
            console.log(JSON.stringify(result.data))
            return res.status(200).json(result.data)
        }
        catch(error){
            console.log(error)
        }
    }
    async employee(req, res){
        try 
        {
            res.render('employee');
            
        }
        catch(error){
            console.log(error)
        }
    }

   
}

module.exports = new SiteController;