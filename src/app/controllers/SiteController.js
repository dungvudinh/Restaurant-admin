const {getOrderCompleted, getTotalMoneyToday,getTotalMoneyYesterday, getOrderBeingServed, 
    getTotalClientToday,getTotalClientYesterday,getTotalMoneyServed, getTotalMoneyByHourYesterday,
    getTotalMoney7Day, getTotalMoneyByHourToday,getTotalMoneyByDayToday, 
    getTotalMoneyByHour7Day}  = require('../models/dashboard');
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
            res.render('room-table');
        }
        catch(error)
        {

        }
    }
   
}

module.exports = new SiteController;