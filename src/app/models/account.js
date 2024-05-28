const connection = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const signToken = (data)=>
{
    return jwt.sign(data, process.env.JWT_SECRET, {
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
            connection.query(`SELECT full_name, password, phone_number FROM account JOIN user ON account.id = user.account_id WHERE phone_number = ${phone_number}`, async (err, res)=>{
                if(!err)
                {
                    console.log(res);
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
                            const token = signToken({full_name:res[0].full_name,phone_number: res[0].phone_number, password: password });
                            console.log(token);
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

const changePassword = (data)=>
    {
        return new Promise((resolve, reject)=>{
            
            const {phone_number, password, new_password, new_confirm_password}= data;
            if(!phone_number || !password || !new_password || !new_confirm_password)
                resolve({
                    status:'error', 
                    message: 'Vui lòng điền đầy đủ thông tin'
                })
            else {
                var sql = `SELECT phone_number, password FROM account WHERE phone_number = ${phone_number}`;
                connection.query(sql, async (err, res)=>{
                    if(!err)
                    {
                        if(res.length > 0){
                            //số điện thoại tồn tại
                            //compare password 
                            const correct = await correctPassword(password, res[0].password);
                            console.log(password); 
                            console.log(res[0].password);
                            if(!correct)
                                resolve({
                                    status:'error', 
                                    message: 'Mật khẩu không đúng. Vui lòng thử lại'
                                })
                            else{
                                if(new_password  != new_confirm_password)
                                    resolve({
                                        status:'error', 
                                        message: 'Mật khẩu xác nhận không khớp. Vui lòng thử lại'
                                    });
                                else {
                                    // mật khẩu xác nhận khớp 
                                    let hashedPassword = await bcrypt.hash(new_password, 10);
                                    connection.query(`UPDATE account SET password = '${hashedPassword}' WHERE phone_number = ${phone_number}`, (error, result)=>{
                                        if(!error)
                                        {
                                            connection.query(`SELECT full_name, password, phone_number FROM account JOIN user ON account.id = user.account_id WHERE phone_number = ${phone_number}`, (er,rs)=>{
                                                const token = signToken({full_name:res[0].full_name,phone_number: res[0].phone_number, password: password });
                                                resolve({
                                                    status:'success', 
                                                    message: 'Thay đổi mật khẩu thành công', 
                                                    token, 
                                                    });
                                            })
                                            
                                        }
                                        else 
                                        resolve({
                                            status:'error', 
                                            message:'Cập nhập mật khẩu không thành công', 
                                            debug: error
                                        });
                                    })
                                }
                            }
                        }
                        else {
                            resolve({
                                status:'error', 
                                message: 'Số điện thoại không tồn tại.Vui lòng thử lại'
                            });
                        }
                    }
                       
                    else 
                        resolve({
                            status:'error', 
                            message:'Gặp lỗi khi truy xuất thông tin tài khoản', 
                            debug:err
                        })
                })

            }
        })
    }
    const resetPassword = (data)=>
        {
            return new Promise((resolve, reject)=>{
                
                const {phone_number,  new_password, new_confirm_password}= data;
                if(!new_password || !new_confirm_password)
                    resolve({
                        status:'error', 
                        message: 'Vui lòng điền đầy đủ thông tin'
                    })
                else {
                    var sql = `SELECT phone_number, password FROM account WHERE phone_number = ${phone_number}`;
                    connection.query(sql, async (err, res)=>{
                        if(!err)
                        {
                            if(res.length > 0){
                                
                                    if(new_password  != new_confirm_password)
                                        resolve({
                                            status:'error', 
                                            message: 'Mật khẩu xác nhận không khớp. Vui lòng thử lại'
                                        });
                                    else {
                                        // mật khẩu xác nhận khớp 
                                        let hashedPassword = await bcrypt.hash(new_password, 10);
                                        connection.query(`UPDATE account SET password = '${hashedPassword}' WHERE phone_number = ${phone_number}`, (error, result)=>{
                                            if(!error)
                                            {
                                                connection.query(`SELECT full_name, password, phone_number FROM account JOIN user ON account.id = user.account_id WHERE phone_number = ${phone_number}`, (er,rs)=>{
                                                    const token = signToken({full_name:res[0].full_name,phone_number: res[0].phone_number, password: res[0].password });
                                                    resolve({
                                                        status:'success', 
                                                        message: 'Thay đổi mật khẩu thành công', 
                                                        token, 
                                                        });
                                                })
                                            }
                                            else 
                                            resolve({
                                                status:'error', 
                                                message:'Cập nhập mật khẩu không thành công', 
                                                debug: error
                                            });
                                        })
                                    }
                                
                            }
                            else {
                                resolve({
                                    status:'error', 
                                    message: 'Số điện thoại không tồn tại.Vui lòng thử lại'
                                });
                            }
                        }
                           
                        else 
                            resolve({
                                status:'error', 
                                message:'Gặp lỗi khi truy xuất thông tin tài khoản', 
                                debug:err
                            })
                    })
    
                }
            })
        }
const newAccount = (data)=>{
    return new Promise((resolve, reject)=>{
        console.log(data);
        const {full_name, gender, age, email, phone_number, password}= data;
        var sql = `SELECT phone_number FROM account WHERE phone_number = ${phone_number}`;
        connection.query(sql, async (err, res)=>{
            if(!err)
            {
                if(res.length > 0)
                    resolve({
                        status:'error', 
                        message: 'Số điện thoại đã được đăng kí. Vui lòng thử lại'
                    });
                else 
                {
                        let hashedPassword = await bcrypt.hash(password, 10);
                        connection.query(`INSERT INTO account(phone_number, password) VALUES("${phone_number}", "${hashedPassword}")`, (error, result)=>{
                            if(!error)
                            {
                                var sql = `INSERT INTO user(account_id, full_name, gender, email, age) VALUES(${result.insertId}, '${full_name}', ${gender}, '${email}', ${age})`;
                                connection.query(sql, (bug, re)=>{
                                    if(!bug){
                                        connection.query(`SELECT full_name, gender, age, email, phone_number FROM account  INNER JOIN user ON account.id = user.account_id WHERE account.id = ${result.insertId}`, (er, rs)=>{
                                            if(!er){
                                                resolve({
                                                    status:'success', 
                                                    message: 'Đăng ký tài khoản thành công', 
                                                    data:rs
                                                });

                                            }
                                            else 
                                                resolve({
                                                    status:'error', 
                                                    message:'Lỗi khi truy xuất thông tin người dùng', 
                                                    debug: er
                                                });
                                        })
                                    }
                                    else{
                                        resolve({
                                            status:'error', 
                                            message:'Gặp lỗi khi thêm thông tin nhân viên', 
                                            debug: bug
                                        });
                                    }
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
               
            else 
                resolve({
                    status:'error', 
                    message:'Gặp lỗi khi truy xuất thông tin tài khoản', 
                    debug:err
                })
        })
    })
}
module.exports = {register, login, changePassword, resetPassword, newAccount}