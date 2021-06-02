// 首页子应用（首页路由）
const express = require('express')
//首页子应用
const indexApp=express()
// 引入歌单推荐的中间件
const recommend = require('../middleware/recommend')
const songSpecies = require('../middleware/songSpecies')
const auth = require('../middleware/auth')
const playershowlist = require('../middleware/playershowlist')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')

indexApp.use(auth.getUser)

//加载首页页面
indexApp.get('/',[recommend.getHot,recommend.getSongList,songSpecies.getSongSpecies,songSpecies.getNewSongSpecies,auth.getUser,playershowlist.getPlayerShowList,PlayList.PlayList,Modify.getmodify_information],(req,res)=> {  
    let {playlists,user,modify_informations,songSpecies,hots,newSongSpecies,playershowlist,news} = req
    res.render('index',{hots:hots,news:news,songSpecies:songSpecies,newSongSpecies:newSongSpecies,user:user,playershowlist:playershowlist,playlists:playlists,modify_informations:modify_informations})
})
module.exports =indexApp 