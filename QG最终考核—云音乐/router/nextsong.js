// 在播放列表切换至下一首歌曲 
const express = require('express')
const NextSong = require('../middleware/changesong')


// 创建类别区分歌曲子应用
const NextSongApp = express()

NextSongApp.get('/',NextSong.getnextsong,(req,res)=>{
    
})

module.exports = NextSongApp