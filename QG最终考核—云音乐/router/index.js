// 首页子应用（首页路由）
const express = require('express')
//首页子应用
const indexApp=express()
// 引入歌单推荐的中间件
const recommend = require('../middleware/recommend')
const songSpecies = require('../middleware/songSpecies')
//加载首页页面
indexApp.get('/',[recommend.getHot,recommend.getSongList,songSpecies.getSongSpecies],(req,res)=> {
   
    res.render('index',{hots:req.hots,news:req.news,songSpecies:req.songSpecies})
})
module.exports =indexApp 