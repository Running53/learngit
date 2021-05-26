const Modify = require('../model/modify')
const GetNowTime = require('../model/getnowtime')

// 修改个人信息中间件
module.exports = {
    // 修改个人信息
    modify: (req,res,next) => {
        let uname = req.body.uname
        let subscription = req.body.subscription
        let sex = req.body.sex
        let birthday = req.body.birthday
        let lastmodifytime = GetNowTime.getnowtime()
        Modify.savemodify(uname,subscription,sex,birthday,lastmodifytime).then(results =>{
            next()
       }).catch(function(err) {
           next(err)
       })
    },
    getmodify_information: (req,res,next) => {
        Modify.getmodify_information().then(results =>{
            req.modify_informations = results
            next()
       }).catch(function(err) {
           next(err)
       })
    }   
}