// 在播放列表切换至下一首歌曲 
const express = require('express')
const LastSong = require('../middleware/changesong')


// 创建类别区分歌曲子应用
const LastSongApp = express()

LastSongApp.get('/',LastSong.getlastsong,(req,res)=>{
    
})

module.exports = LastSongApp