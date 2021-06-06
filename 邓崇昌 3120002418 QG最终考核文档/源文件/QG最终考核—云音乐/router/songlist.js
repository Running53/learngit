// 点击歌单获得详情歌曲功能
const express = require('express')
const auth = require('../middleware/auth')
const songList = require('../middleware/songList')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')
const GetLastPlay = require('../middleware/GetLastPlay')

// 点击歌单获得详情歌曲子应用
const songlistApp = express()

songlistApp.use(auth.getUser)

songlistApp.get('/:id',[GetLastPlay.getlastplay,auth.getUser,songList.getSongListById,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,songlist} = req
    res.render('songlist',{lastplay:lastplay,user:user,songList:songlist,time:req.songlist.length,playlists:playlists,modify_informations:modify_informations})
})

module.exports = songlistApp