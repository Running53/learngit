const Recommend = require('../model/recommend')

// 歌单推荐中间件
module.exports = {
    // 获取热门文章
    getHot: (req,res,next) =>{
        Recommend.getHot(8).then(results =>{
             req.hots = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    getSongList: (req,res,next) =>{
        Recommend.getSongList(8).then(results =>{
             req.news = results
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}