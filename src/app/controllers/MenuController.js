const {getMenuByGroupId, getIngredientById, getIngredient, insertFood, recordQuantity} = require("../models/food");

class MenuController 
{
    async foodMenu(req, res)
    {
       try 
       {
            var foodGroupId = req.query.id;
            var page = req.query.page;
            console.log(page)
            console.log(foodGroupId)
            var listMenuByGroupId = await getMenuByGroupId(foodGroupId, page);
            console.log(listMenuByGroupId)
            var pageQUantity = await recordQuantity(foodGroupId);
            
            var listMenuByGroupPromise = await listMenuByGroupId.map(async (mainMenu)=>{
                var imgUrls = mainMenu.image_url;
                var ingredientName = null;
                if(mainMenu.ingredient != null)
                {
                    ingredientName = JSON.parse(mainMenu.ingredient).map(async (item)=>{
                        return await getIngredientById(item);
                    })
                }
                if(mainMenu.image_url != null)
                    imgUrls = JSON.parse(mainMenu.image_url); 
                var data =ingredientName != null ?  await Promise.all(ingredientName) : null;
                return {...mainMenu, ingredient:data, image_url: imgUrls}      
            })
            var listMenuByGroupConvert = await Promise.all(listMenuByGroupPromise);
            var listIngredient = await getIngredient();
            res.render('menu/food', {
                listMenuByGroup:listMenuByGroupConvert,
                listIngredient,
                pageQuantity: Math.ceil(pageQUantity/4)
            });  
       }
       catch(error)
       {
            console.log(error);
       }
        
    }
    async newFood(req, res)
    {
        try 
        {
            
            const imgPaths = req.files.map(file=>file.path);
            const data  = req.body;
            await insertFood(data, imgPaths);
            res.redirect('back');
        }
        catch(error)
        {
            console.log(error);
        }
    }
    drinkMenu(req, res)
    {
        res.render('menu/drink');
    }
}

module.exports =  new MenuController;