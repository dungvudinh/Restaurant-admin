const {getFirstMenu, getIngredientById, getIngredient, insertFood, recordQuantity, menuFilter, updateFood, updateStatusFood, deleteFood,
 binFood, deletePermFood, restoreFood} = require("../models/food");
const {getFirstDrinkMenu, drinkMenuFilter, recordQuantityDrink, insertDrink, updateDrink, deleteDrink, binDrink, restoreDrink, deletePermDrink} = require("../models/drink");
class MenuController 
{
    async foodMenu(req, res)
    {
       try 
       {
           
            var listMenuByGroupId = await getFirstMenu();
            var pageQUantity = await recordQuantity(1);
            console.log(listMenuByGroupId)
            var listMenuByGroupPromise = await listMenuByGroupId.map(async (mainMenu)=>{
                var imgUrls = mainMenu.image_url;
                var ingredientName = null;
                console.log(mainMenu.ingredient == 'null');
                if(mainMenu.ingredient != null)
                {
                    ingredientName = JSON.parse(mainMenu.ingredient).map(async (item)=>{
                        return await getIngredientById(item);
                    })
                }
                if(mainMenu.image_url != null)
                    imgUrls = JSON.parse(mainMenu.image_url); 
                var data = ingredientName != null ?  await Promise.all(ingredientName) : null;
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
            const result =  await insertFood(data, imgPaths);
            res.json(result);
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

            const menuGroupId = req.query.id;
            const pageId = req.query.page;
            const search = req.query.q;
            var listMenuByGroupId = await menuFilter(menuGroupId, pageId, search);
            var pageQUantity = await recordQuantity(menuGroupId);
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
            res.json({
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
    async updateFood(req, res)
    {
        try 
        {
            var newListImgPath;
            var filePaths = req.files ? req.files.map(file=>file.path) : [];
            if(JSON.parse(req.body.image_url) == null)
                newListImgPath = filePaths;
            else 
                newListImgPath= JSON.parse(req.body.image_url).concat(filePaths);
            const data = {...req.body, image_url:newListImgPath};
            const result = await updateFood(data);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async updateStatusFood(req, res)
    {
        try 
        {
            const result = await updateStatusFood(req.body);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async deleteFood(req, res)
    {
        try 
        {
            const result  = await deleteFood(req.body.menu_id);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async binFood(req, res)
    {
        try 
        {
            console.log(req);
            const result = await binFood(req.query.menu_type);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async deletePerm(req, res)
    {
        try 
        {
            const result = await deletePermFood(req.query.menu_id);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async restoreFood(req, res)
    {
        try 
        {
            const result = await restoreFood(req.query.menu_id);
            res.json(result);
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async drinkMenu(req, res)
    {
        try 
       {
           
            var listMenuByGroupId = await getFirstDrinkMenu();
            var pageQUantity = await recordQuantityDrink(1);
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
                var data = ingredientName != null ?  await Promise.all(ingredientName) : null;
                return {...mainMenu, ingredient:data, image_url: imgUrls}      
            })
            var listMenuByGroupConvert = await Promise.all(listMenuByGroupPromise);
            var listIngredient = await getIngredient();
            res.render('menu/drink', {
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
    async drinkFilterData(req, res)
    {
        try 
        {

            const menuGroupId = req.query.id;
            const pageId = req.query.page;
            const search = req.query.q;
            var listMenuByGroupId = await drinkMenuFilter(menuGroupId, pageId, search);
            
            var pageQUantity = await recordQuantityDrink(menuGroupId);
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
            res.json({
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
    async newDrink(req, res)
    {
        try 
        {
            const imgPaths = req.files.map(file=>file.path);
            const data  = req.body;
            const result =  await insertDrink(data, imgPaths);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async updateDrink(req, res)
    {
        try 
        {
            var newListImgPath;
            var filePaths = req.files ? req.files.map(file=>file.path) : [];
            if(JSON.parse(req.body.image_url) == null)
                newListImgPath = filePaths;
            else 
                newListImgPath= JSON.parse(req.body.image_url).concat(filePaths);
            const data = {...req.body, image_url:newListImgPath};
            const result = await updateDrink(data);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async updateStatusDrink(req, res)
    {
        try 
        {
            const result = await updateStatusFood(req.body);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async deleteDrink(req, res)
    {
        try 
        {
            const result  = await deleteDrink(req.body.menu_id);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async binDrink(req, res)
    {
        try 
        {
            console.log(req.query)
            const result = await binDrink(req.query.menu_type);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    async restoreDrink(req, res)
    {
        try 
        {
            const result = await restoreDrink(req.query.menu_id);
            res.json(result);
        }
        catch(error)
        {
            console.log(error)
        }
    }
    async deletePermDrink(req, res)
    {
        try 
        {
            const result = await deletePermDrink(req.query.menu_id);
            res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

module.exports =  new MenuController;