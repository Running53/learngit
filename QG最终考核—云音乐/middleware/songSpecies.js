const SongSpecies = require('../model/songSpecies')

// 歌单推荐中间件
module.exports = {
    // 获取热门音乐种类
    getSongSpecies: (req,res,next) =>{
        SongSpecies.getSongSpecies(5).then(results =>{
             req.songSpecies = results
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}