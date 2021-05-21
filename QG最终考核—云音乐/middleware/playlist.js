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
    }
}