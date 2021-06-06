const Recommend = require('../model/recommend')

// 歌单推荐中间件
module.exports = {
    // 获取热门歌单
    getHot: (req,res,next) =>{
        Recommend.getHot(8).then(results =>{
             req.hots = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    //获取最新歌单
    getSongList: (req,res,next) =>{
        Recommend.getSongList(8).then(results =>{
             req.news = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },  
    //获取制定类目下的音乐列表 
    getCategoryId: (req,res,next) =>{
        let id = req.params.id
        Recommend.getCategoryId(id).then(results =>{
             req.song = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    //搜索通过搜索关键词获取歌曲 
    getSongByKeyword: (req,res,next) =>{
        let keyword = req.query.keyword
        Recommend.getSongByKeyword(keyword).then(results =>{
             req.songs = results
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}