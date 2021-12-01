// 搜索子应用
const express = require('express')
const category = require('../middleware/recommend')
const auth = require('../middleware/auth')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')
const GetLastPlay = require('../middleware/GetLastPlay')

// 创建类别区分歌曲子应用
const searchApp = express()

searchApp.get('/',[category.getSongByKeyword],(req,res)=>{
        res.send(req.songs)
})
searchApp.get('/!',[GetLastPlay.getlastplay,category.getSongByKeyword,auth.getUser,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,songs,} = req
    res.render('search',{lastplay:lastplay,songs:songs,user:user,keyword:req.query.keyword,playlists:playlists,modify_informations:modify_informations})
})

module.exports = searchApp