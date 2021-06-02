const SongList = require('../model/songlist')

// 歌单歌单的中间件
module.exports = {
    // 获取歌单歌曲内容
    getSongListById: (req,res,next) =>{

        let id = (req.params.id)

        SongList.getSongListById(id).then(results =>{
             req.songlist = results
             SongList.increasenumber(results[0].hot + 1,results[0].ids)
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}