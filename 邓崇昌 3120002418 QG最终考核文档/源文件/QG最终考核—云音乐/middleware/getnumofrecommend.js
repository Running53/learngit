
// 获取上一次登录时间子应用
const Addlist = require('../model/addlist')

module.exports = {
    // 获取上一次登录时间
    getnumofrecommend: (req,res,next) =>{       
        Addlist.getnumofrecommend().then(results =>{  
            req.numofrecommend = results
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}