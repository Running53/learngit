// 搜索子应用
const express = require('express')
const category = require('../middleware/recommend')
const auth = require('../middleware/auth')
const PlayList = require('../middleware/playlist')


// 创建类别区分歌曲子应用
const searchApp = express()

searchApp.get('/',[category.getSongByKeyword],(req,res)=>{
    res.send(req.songs)
})
searchApp.get('/!',[category.getSongByKeyword,auth.getUser,PlayList.PlayList],(req,res)=>{
    res.render('search',{songs:req.songs,user:req.user,keyword:req.query.keyword,playlists:req.playlists})
})

module.exports = searchApp