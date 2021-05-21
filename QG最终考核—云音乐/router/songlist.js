// 点击歌单获得详情歌曲功能
const express = require('express')
const auth = require('../middleware/auth')
const songList = require('../middleware/songList')
const PlayList = require('../middleware/playlist')


// 点击歌单获得详情歌曲子应用
const songlistApp = express()

songlistApp.use(auth.getUser)

songlistApp.get('/:id',[auth.getUser,songList.getSongListById,PlayList.PlayList],(req,res)=>{
    res.render('songlist',{user:req.user,songList:req.songlist,time:req.songlist.length,playlists:req.playlists})
})

module.exports = songlistApp