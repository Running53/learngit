// 使用类别区分歌曲 
const express = require('express')
const category = require('../middleware/recommend')
const species = require('../middleware/songSpecies')
const auth = require('../middleware/auth')
const PlayList = require('../middleware/playlist')


// 创建类别区分歌曲子应用
const categoryApp = express()

categoryApp.use(auth.getUser)

categoryApp.get('/list/:id',[category.getCategoryId,species.getNameById,auth.getUser,PlayList.PlayList],(req,res)=>{
    let {song,Name,user,playlists} = req
    res.render('category',{song:song,Name:Name,user:user,playlists:playlists})
})

module.exports = categoryApp