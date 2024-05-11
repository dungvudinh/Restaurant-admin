const {getOrderCompleted, getTotalMoneyToday,getTotalMoneyYesterday, getOrderBeingServed, 
    getTotalClientToday,getTotalClientYesterday,getTotalMoneyServed, getTotalMoneyByHourYesterday,
    getTotalMoney7Day, getTotalMoneyByHourToday,  getTotalMoneyByHour7Day, getClientQuantityToday, 
    getClientQuantityYesterday, getClientQuantity7Day, getTop10MenuToday, getTop10MenuYesterday, 
    getTop10Menu7Day}  = require('../models/dashboard');

const {getAllArea, insertArea, searchQuery, filterData, getAllRoomTable, recordQuantity
, insertRoomTable, updateRoomTable, getHistoryByTableId, deleteTable} = require('../models/roomTable');
const jwt = require('jsonwebtoken');
class SiteController 
{
     async dashboard(req,res)
    {
        try 
        {
            var orderCompleted = await getOrderCompleted();
            var totalMoneyToday  = await getTotalMoneyToday();
            var totalMoneyYesterday = await getTotalMoneyYesterday();
            var orderServed = await getOrderBeingServed();
            var totalMoneyServed = await getTotalMoneyServed();
            var totalClientToday = await getTotalClientToday();
            var totalClientYesterday = await getTotalClientYesterday();
            var totalMoneyByHourYesterday = await getTotalMoneyByHourYesterday();
            var totalMoney7Day = await getTotalMoney7Day();
            var totalMoneyByHourToday = await getTotalMoneyByHourToday();
            var totalMoneyByHour7Day = await getTotalMoneyByHour7Day();
            var clientQuantityToday = await getClientQuantityToday();
            var clientQuantityYesterday = await getClientQuantityYesterday();
            var clientQuantity7Day = await getClientQuantity7Day();
            var top10MenuToday  = await getTop10MenuToday();
            var top10MenuYesterday = await getTop10MenuYesterday();
            var top10Menu7Day = await getTop10Menu7Day();
            res.render('dashboard',{
                numOfOrderCompleted:orderCompleted.length > 0 ? orderCompleted[0].numOfOrderCompleted : 0, 
                totalMoneyToday: totalMoneyToday[0].total ? totalMoneyToday[0].total : 0, 
                totalMoneyYesterday :totalMoneyYesterday[0].total  ? totalMoneyYesterday[0].total : 0, 
                totalServing: orderServed.length > 0 ? orderServed[0].orderServed : 0, 
                totalClientToday: totalClientToday.length > 0 ? totalClientToday[0].totalClient : 0, 
                totalClientYesterday:totalClientYesterday.length > 0 ?  totalClientYesterday[0].totalClient : 0, 
                totalMoneyServed: totalMoneyServed.length >  0 ? totalMoneyServed[0].total : 0, 
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
            var result = await getHistoryByTableId(req.query.tableId);
            // if(result.status == 'success')
            //         result = {status:result.status, data: result.data.map(item=>())}
            res.json(result);
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
   
}

module.exports = new SiteController;