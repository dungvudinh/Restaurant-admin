const sql = require('../../config/db');

const Menu = function(menu)
{
    this.name = menu.name;
    this.image_url = menu.image_url;
    this.description = menu.description;
    this.menu_type_id = menu.menu_type_id;
    this.menu_group_id = menu.menu_group_id;
    this.ingredient = menu.ingredient;
}

Menu.get_all = async (result)=>
{
    sql.query("SELECT * FROM menu", (err, res)=>
    {
        if(err)
        {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("data: ", res);
        result(null,res);
    })
   
}
Menu.create = (newMenu, result)=>
{
    sql.query('INSERT INTO menu SET ?', newMenu, (err, res)=>
    {
        if(err)
        {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('tạo menu mới thành công', {id:res.insertId, ...newMenu});
        result(null, {id: res.insertId, ...newMenu})
    })
}
module.exports = Menu;