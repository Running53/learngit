// 获取上一次登录时间子应用
const GetLoginTime = require('../model/getlogintime')

module.exports = {
    // 获取上一次登录时间
    getlogintime: (req,res,next) =>{       
        GetLoginTime.getlogintime().then(results =>{  
            req.lastlogintime = results
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}