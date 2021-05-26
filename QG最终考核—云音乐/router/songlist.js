// 点击歌单获得详情歌曲功能
const express = require('express')
const auth = require('../middleware/auth')
const songList = require('../middleware/songList')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')

// 点击歌单获得详情歌曲子应用
const songlistApp = express()

songlistApp.use(auth.getUser)

songlistApp.get('/:id',[auth.getUser,songList.getSongListById,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    res.render('songlist',{user:req.user,songList:req.songlist,time:req.songlist.length,playlists:req.playlists,modify_informations:req.modify_informations})
})

module.exports = songlistApp