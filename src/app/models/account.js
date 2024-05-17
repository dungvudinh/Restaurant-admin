const connection = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signToken = (full_name)=>
{
    return jwt.sign({full_name}, process.env.JWT_SECRET, {
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
                                            message: 'Đăng ký tài khoản thành công', 
                                            token, 
                                            data:rs
                                        });
                                    else 
                                        resolve({
                                            status:'error', 
                                            message:'Lỗi khi truy xuất thông tin người dùng', 
                                            debug: er
                                        });
                                })
                                
                            }
                            else 
                            resolve({
                                status:'error', 
                                message:'Tạo tài khoản không thành công', 
                                debug: error
                            });
                        });
                    }
                }

            }
               
            else 
                resolve({
                    status:'error', 
                    message:'Gặp lỗi khi truy xuất thông tin tài khoản', 
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
            connection.query(`SELECT full_name, password FROM account JOIN user ON account.id = user.account_id WHERE phone_number = ${phone_number}`, async (err, res)=>{
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
                            console.log(res[0].full_name)
                            const token = signToken(res[0].full_name);
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