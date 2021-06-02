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
    },
    getallSongSpecies: (req,res,next) =>{
        SongSpecies.getallSongSpecies().then(results =>{
             req.allsongSpecies = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    // 获取最新音乐种类
    getNewSongSpecies: (req,res,next) =>{
        SongSpecies.getNewSongSpecies(5).then(results =>{
             req.newSongSpecies = results
             next()
        }).catch(function(err) {
            next(err)
        })
    },
    // 获取对应id下的歌曲种类名
    getNameById: (req,res,next) =>{
        let id = req.params.id
        SongSpecies.getNameById(id).then(results =>{
             req.Name = results
             next()
        }).catch(function(err) {
            next(err)
        })
    }
}