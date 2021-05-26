// 使用类别区分歌曲 
const express = require('express')
const category = require('../middleware/recommend')
const species = require('../middleware/songSpecies')
const auth = require('../middleware/auth')
const PlayList = require('../middleware/playlist')
const Modify = require('../middleware/modify')

// 创建类别区分歌曲子应用
const categoryApp = express()

categoryApp.use(auth.getUser)

categoryApp.get('/list/:id',[category.getCategoryId,species.getNameById,auth.getUser,PlayList.PlayList,Modify.getmodify_information],(req,res)=>{
    let {song,Name,user,playlists,modify_informations} = req
    res.render('category',{song:song,Name:Name,user:user,playlists:playlists,modify_informations:modify_informations})
})

module.exports = categoryApp