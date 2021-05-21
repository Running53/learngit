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

indexApp.use(auth.getUser)

//加载首页页面
indexApp.get('/',[recommend.getHot,recommend.getSongList,songSpecies.getSongSpecies,songSpecies.getNewSongSpecies,auth.getUser,playershowlist.getPlayerShowList,PlayList.PlayList],(req,res)=> {  
    res.render('index',{hots:req.hots,news:req.news,songSpecies:req.songSpecies,newSongSpecies:req.newSongSpecies,user:req.user,playershowlist:req.playershowlist,playlists:req.playlists})
})
module.exports =indexApp 