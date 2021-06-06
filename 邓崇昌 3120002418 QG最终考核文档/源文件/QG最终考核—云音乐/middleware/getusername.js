const searchUsername = require('../model/searchUsername')

// 歌单推荐中间件
module.exports = {
    // 查找有无与注册用户名重复
    getSearchUsername: (req,res,next) => {
        let username = req.query.username
        searchUsername.getSearchUsername(username).then(results =>{
            req.searchUsernames = results
            next()
       }).catch(function(err) {
           next(err)
       })
    }
}