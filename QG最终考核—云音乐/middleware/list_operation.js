const Delete = require('../model/delete')

// 删除歌曲中间件
module.exports = {
    // 在我的收藏歌曲中删除歌曲
    deletesongfromcollect: (req,res,next) => {
        let id = req.query.id
        Delete.deletesongfromcollect(id).then(results =>{
            
            next()
       }).catch(function(err) {
           next(err)
       })
    },
    // 在我的收藏歌单中删除歌单
    deletesongfromcollectlist: (req,res,next) => {
        let id = req.query.id
        Delete.deletesongfromcollectlist(id).then(results =>{           
            next()
       }).catch(function(err) {
           next(err)
       })
    }
}