const Menu = require('../models/menu');
const sql = require('../../config/db');
class MenuController 
{
    async foodMenu(req, res)
    {
       
        // Menu.get_all((err, data)=>
        // {
        //     if(err)
        //         res.redirect('/500');
        //     else 
        //     {
        //         console.log(data);
        //     }
        // })
        // const newMenu = new Menu({
        //     name:"bún đậu mắm tôm", 
        //     image_url:"", 
        //     description: "món ăn ngon lọt top", 
        //     menu_type_id:1, 
        //     menu_group_id:JSON.stringify([2]), 
        //     ingredient: JSON.stringify(['đậu rán', 'nem', 'thịt lợn', 'rau'])
        // })
        // Menu.create(newMenu, (err, data)=>
        // {
        //     if(err) 
        //         res.redirect('/500');
        //     else 
        //         console.log(data);
        // })
        res.render('menu/food');
    }
    drinkMenu(req, res)
    {
        res.render('menu/drink');
    }
}

module.exports =  new MenuController;