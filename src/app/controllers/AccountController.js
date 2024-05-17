const {register, login} = require('../models/account');
const jwt = require('jsonwebtoken');
class AccountController
{
    async register(req, res)
    {
        try 
        {
            const result = await register(req.body);
            console.log(result)
             res.json(result);
        }
        catch(error)
        {
            console.log(error);
        }
        
    }
    async verifyAccount(req,res, next)
    {
        try 
        {
            const token = req.cookies.token;
            if(!token)
                return res.redirect('/login');
            else 
                jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
                    if(err)
                        return res.json({message:'Xác thực thông tin thất bại'})
                    else 
                    {
                        req.id = decode.id;
                        next();
                    }
                })
        }
        catch(error)
        {
            throw(error);
        }
    }

    async authentication(req, res)
    {
        try 
        {
            const result  = await login(req.body);
            if(result.status == 'success')
            {
                res.cookie('token', result.token, { expires: new Date(Date.now() + 900000), httpOnly: true })
            }
                res.json(result);
                
        }
        catch(error)
        {
            console.log(error)
        }
        
    }

}

module.exports = new AccountController;