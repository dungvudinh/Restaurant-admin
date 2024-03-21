

class SiteController 
{
    dashboard(req,res)
    {
        res.render('dashboard');
    }
    roomTable(req, res)
    {
        res.render('room-table');
    }
}

module.exports = new SiteController;