// 将歌单的所有音乐添加到播放列表中 
const express = require('express')
const AddSongs = require('../middleware/addSongs')


// 创建类别区分歌曲子应用
const AddSongsApp = express()

AddSongsApp.get('/',AddSongs.searchsongs,(req,res)=>{
    res.send({listsongs:req.listsongs})
})

module.exports = AddSongsApp