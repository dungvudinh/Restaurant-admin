

class MenuController 
{
    foodMenu(req, res)
    {
        res.render('menu/food');
    }
    drinkMenu(req, res)
    {
        res.render('menu/drink');
    }
}

module.exports =  new MenuController;