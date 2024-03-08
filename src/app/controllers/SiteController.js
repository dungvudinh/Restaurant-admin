

class SiteController 
{
    dashboard(req,res)
    {
        res.render('dashboard');
    }
}

module.exports = new SiteController;