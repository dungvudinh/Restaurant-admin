const {getOrderCompleted, getTotalMoney,getTotalMoneyYesterday, getOrderBeingServed, 
    getTotalClientToday,getTotalClientYesterday,getTotalMoneyServed, getTotalMoneyByHourYesterday,
    getTotalMoneyByDay7Day, getTotalMoneyByHourToday, getTotalMoneyByHour7Day}  = require('../models/dashboard');
class SiteController 
{
     async dashboard(req,res)
    {
        
        try 
        {
            var result = await getOrderCompleted();
            var totalMoney  = await getTotalMoney();
            var totalMoneyYesterday = await getTotalMoneyYesterday();
            var orderServed = await getOrderBeingServed();
            var totalMoneyServed = await getTotalMoneyServed();
            var totalClientToday = await getTotalClientToday();
            var totalClientYesterday = await getTotalClientYesterday();
            var totalMoneyByHourYesterday = await getTotalMoneyByHourYesterday();
            var totalMoneyByDay7Day = await getTotalMoneyByDay7Day();
            var totalMoneyByHourToday = await getTotalMoneyByHourToday();
            var totalMoneyByHour7Day = await getTotalMoneyByHour7Day();
            var newtotalMoneyByDay7Day = totalMoneyByDay7Day.map(data=>{
                var utcDate = new Date(Date.UTC(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), data.date.getHours(), data.date.getMinutes()));
                return JSON.stringify(utcDate);
            })
            console.log('newtotalMoneyByDay7Day ',JSON.stringify(newtotalMoneyByDay7Day));
            res.render('dashboard',{
                numOfOrderCompleted:result[0].numOfOrderCompleted, 
                totalMoney: totalMoney[0].total  ? totalMoney[0].total : 0, 
                totalMoneyYesterday :totalMoneyYesterday[0].total, 
                totalServing: orderServed[0].orderServed, 
                totalClientToday: totalClientToday[0].totalClient, 
                totalClientYesterday: totalClientYesterday[0].totalClient, 
                totalMoneyServed: totalMoneyServed[0].total, 
                totalMoneyByHourYesterday:JSON.stringify(totalMoneyByHourYesterday), 
                totalMoneyByDay7Day: JSON.stringify(totalMoneyByDay7Day), 
                totalMoneyByHour7Day:JSON.stringify(totalMoneyByHour7Day),
                totalMoneyByHourToday: JSON.stringify(totalMoneyByHourToday)
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