// 使用类别区分歌曲 
const express = require('express')
const category = require('../middleware/recommend')
const species = require('../middleware/songSpecies')
const auth = require('../middleware/auth')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')
const GetLastPlay = require('../middleware/GetLastPlay')

// 创建类别区分歌曲子应用
const categoryApp = express()

categoryApp.use(auth.getUser)

categoryApp.get('/list/:id',[GetLastPlay.getlastplay,category.getCategoryId,species.getNameById,auth.getUser,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {song,Name,user,playlists,modify_informations,lastplay} = req
    res.render('category',{lastplay:lastplay,song:song,Name:Name,user:user,playlists:playlists,modify_informations:modify_informations})
})

module.exports = categoryApp