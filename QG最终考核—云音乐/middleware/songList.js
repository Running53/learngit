const SongList = require('../model/songlist')

// 歌单歌单的中间件
module.exports = {
    // 获取歌单歌曲内容
    getSongListById: (req,res,next) =>{
        let id = (req.params.id)%8;
        if(id === 0){
            id = 8;
        }
        if(req.params.id > 16) {
            id = req.params.id
        }
        SongList.getSongListById(id).then(results =>{
             req.songlist = results
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}