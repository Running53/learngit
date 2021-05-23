// 从播放列表中删除歌曲子应用
const AddSongs = require('../model/addsongs')
const Delete = require('../model/delete')
const ChangeSong = require('../model/changesong')

module.exports = {
    // 从播放列表中删除歌曲操作
    deletesong: (req,res,next) =>{
        let id = req.query.id
        Delete.deletesong(id)
        
        ChangeSong.searchthissongs(id).then(results =>{  
            req.playshowsong = results
            next()
        }).catch(function(err) {
            next(err)
        })
    }
}