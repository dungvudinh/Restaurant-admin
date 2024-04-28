const {getOrderCompleted, getTotalMoneyToday,getTotalMoneyYesterday, getOrderBeingServed, 
    getTotalClientToday,getTotalClientYesterday,getTotalMoneyServed, getTotalMoneyByHourYesterday,
    getTotalMoney7Day, getTotalMoneyByHourToday,  getTotalMoneyByHour7Day, getClientQuantityToday, 
    getClientQuantityYesterday, getClientQuantity7Day, getTop10MenuToday, getTop10MenuYesterday, 
    getTop10Menu7Day}  = require('../models/dashboard');

const {getAllArea, insertArea, searchQuery} = require('../models/roomTable');
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
                totalMoneyYesterday :totalMoneyYesterday.length > 0 ? totalMoneyYesterday[0].total : 0, 
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
            const searchQuery2 = await searchQuery();
            console.log(searchQuery)
            res.render('room-table', {
                listArea, 
                searchQuery: JSON.stringify(searchQuery2)
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
            res.json(req.params);
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
            await insertArea(req.body);
            res.redirect('back');
        }
        catch(error)
        {
            console.log(error);
        }
    }
   
}

module.exports = new SiteController;