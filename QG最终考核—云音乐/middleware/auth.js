// 权限子引用
module.exports = {
    // 相当于我们要从session中读取用户
    getUser: (req,res,next) => {
        // 从session中获取数据
        req.user = req.session.user
        next()
    },
    // 是否允许用户查看个人中心
    allowToAddmin: (req,res,next) => {
        let user = req.session.user
        if(user) {
            req.user = user   
            next()
        }else {
            res.redirect('/login')
        }
    }
}