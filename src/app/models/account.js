const connection = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signToken = (id)=>
{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

const correctPassword =async (candiatePassword, userPassword)=>
{
    return  await  bcrypt.compare(candiatePassword, userPassword);
}
const register = (data)=>
{
    return new Promise((resolve, reject)=>{
        
        const {phone_number, password, password_confirm}= data;
        var sql = `SELECT phone_number FROM account WHERE phone_number = ${phone_number}`;
        connection.query(sql, async (err, res)=>{
            if(!err)
            {
                if(res.length > 0)
                    resolve({
                        status:'error', 
                        message: 'That phone number is already in use'
                    });
                else 
                {
                    if(password  != password_confirm)
                        resolve({
                            status:'error', 
                            message: 'Password do not match'
                        });
                    else 
                    {
                        
                        let hashedPassword = await bcrypt.hash(password, 10);
                        connection.query(`INSERT INTO account(phone_number, password) VALUES("${phone_number}", "${hashedPassword}")`, (error, result)=>{
                            if(!error)
                            {
                                const token = signToken(result.insertId);
                                connection.query(`SELECT * FROM account WHERE id = ${result.insertId}`, (er, rs)=>{
                                    if(!er)
                                        resolve({
                                            status:'success', 
                                            message: 'create account successfully', 
                                            token, 
                                            data:rs
                                        });
                                    else 
                                        resolve({
                                            status:'error', 
                                            debug: er
                                        });
                                })
                                
                            }
                            else 
                            resolve({
                                status:'error', 
                                debug: error
                            });
                        });
                    }
                }

            }
               
            else 
                resolve({
                    status:'error', 
                    debug:err
                })
        })
    })
}

const login = (data)=>
{
    return new Promise((resolve, reject)=>{
        
        const {phone_number, password}= data;
        if(!phone_number || !password)
            resolve({
                status:'error', 
                message: 'Vui lòng điền đầy đủ thông tin'
            })
        else 
        {
            connection.query(`SELECT * FROM account WHERE phone_number = ${phone_number}`, async (err, res)=>{
                if(!err)
                {
                    if(res.length > 0)
                    {
                        const correct = await correctPassword(password, res[0].password);
                        if( !correct)
                            resolve({
                                status:'error', 
                                message: 'Mật khẩu không đúng. Vui lòng thử lại'
                            })
                        else 
                        {
                            const token = signToken(res[0].id);
                            resolve({
                                status:'success', 
                                message:'Đăng nhập thành công', 
                                token, 
                                data:res[0]
                            })
                        }
                    }
                    else 
                        resolve({
                            status:'error', 
                            message: 'Số điện thoại không tồn tại. Vui lòng thử lại'
                        })
                }
                else 
                    resolve({
                        status:'error', 
                        message: 'Số điện thoại không tồn tại. Vui lòng thử lại'
                    })
            })
        }
    })
}

module.exports = {register, login}