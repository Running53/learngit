const PlayList = require('../model/playlist')

// 歌单歌单的中间件
module.exports = {
    // 获取歌单歌曲内容
    PlayList: (req,res,next) =>{
        PlayList.getplaylist().then(results =>{
             req.playlists = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    getcollectsonglist: (req,res,next) =>{
        PlayList.getcollectsonglist().then(results =>{
             req.collectsongs = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    getcollectlist: (req,res,next) =>{
        PlayList.getcollectlist().then(results =>{
             req.collectlists = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    gethistorylist: (req,res,next) =>{
        PlayList.gethistorylist().then(results =>{
             req.history_songs = results
             next()
        }).catch(function(err) {
            next(err)
        })
    }
    
}