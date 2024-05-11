const menuRoute = require('./menuRoute');
const siteRoute = require('./siteRoute');
const employeeRoute = require('./employeeRoute');
const accountRoute = require('./accountRoute');
const apiRoute = require('./apiRoute');
const jwt = require('jsonwebtoken');
const verifyAccount = async (req,res, next)=>
{
    try 
    {
        const token = req.cookies.token;
        if(!token)
            // return res.json({message:'Phiên đăng nhập đã hết hạn.Vui lòng đăng nhập lại'})
             return res.redirect('/login');
        else 
            jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
                if(err)
                    return res.json({message:'Xác thực thông tin thất bại'})
                else 
                {
                    req.name = decode.name;
                    next();
                }
            })
    }
    catch(error)
    {
        throw(error);
    }
}
function route(app)
{
    app.use('/api',apiRoute)
    app.use('/employee',verifyAccount,  employeeRoute);
    app.use('/menu',verifyAccount,  menuRoute);
    app.use('/account',  accountRoute);
    app.use('/',  siteRoute);
}

module.exports = route;