// 查看所有歌曲分类子应用
const express = require('express')
const category = require('../middleware/recommend')
const auth = require('../middleware/auth')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')
const songSpecies = require('../middleware/songSpecies')
const GetLastPlay = require('../middleware/GetLastPlay')

// 创建类别区分歌曲子应用
const moreApp = express()

moreApp.get('/',[GetLastPlay.getlastplay,songSpecies.getallSongSpecies,category.getSongByKeyword,auth.getUser,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {lastplay,playlists,user,modify_informations,allsongSpecies,songs} = req  
    res.render('more',{lastplay:lastplay,allsongSpecies:allsongSpecies,songs:songs,user:user,playlists:playlists,modify_informations:modify_informations})
})

module.exports = moreApp